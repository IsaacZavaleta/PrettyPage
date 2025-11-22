import {
  ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const typoInProgressRef = useRef(false);
  const activeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    if (activeTimeoutRef.current) {
      clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }

    let timeout: NodeJS.Timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const schedule = (fn: () => void, delay: number) => {
      timeout = setTimeout(() => fn(), delay);
      activeTimeoutRef.current = timeout;
    };

    // BORRADO
    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);

        // Si es el último texto y loop es falso, no avanzamos más ni repetimos
        if (!loop && currentTextIndex === textArray.length - 1) {
          return;
        }

        if (onSentenceComplete)
          onSentenceComplete(textArray[currentTextIndex], currentTextIndex);

        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
        return;
      }

      schedule(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);

      return () => clearTimeout(timeout);
    }

    // ESCRITURA NORMAL O TYPOS
    if (currentCharIndex < processedText.length) {
      // Efecto typo SOLO en el último bloque
      const isLastSentence = currentTextIndex === textArray.length - 1;
      const typoChance = isLastSentence ? 0.08 : 0;
      const shouldMakeTypo =
        isLastSentence &&
        !typoInProgressRef.current &&
        Math.random() < typoChance &&
        ![" ", "\n", "/", "*", "-", ">"].includes(
          processedText[currentCharIndex]
        );

      // Escritura normal
      schedule(() => {
        if (typoInProgressRef.current) return;
        setDisplayedText((prev) => prev + processedText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, getRandomSpeed());

      return () => clearTimeout(timeout);
    }

    // FIN DE BLOQUE
    // Si estamos en el último bloque y no hay loop, solo terminamos (NO borramos, NO avanzamos)
    if (!loop && currentTextIndex === textArray.length - 1) return;

    // Si hay más bloques, activa el borrado (efecto frase a frase)
    schedule(() => {
      setIsDeleting(true);
    }, pauseDuration);

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  // RENDERizado (colores, formatos)
  return createElement(
    Component,
    {
      ref: containerRef,
      className: `whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline" style={{ fontSize: "1.1rem" }}>
      {(() => {
        const lines = displayedText.split("\n");
        return [
          lines.map((line, idx) => {
            if (line.trim().startsWith(">")) {
              return (
                <span
                  key={idx}
                  style={{
                    color: "#d21c1c",
                    fontStyle: "italic",
                    background: "rgba(229, 231, 235, 0.25)",
                    padding: "0.15em 0.5em",
                    borderRadius: "6px",
                  }}
                >
                  {line.replace(/^>\s?/, "")}
                  {idx < lines.length - 1 ? "\n" : ""}
                </span>
              );
            }

            if (
              line.trim().startsWith("//") ||
              line.trim().startsWith("/*") ||
              line.trim().startsWith("/**") ||
              line.trim().startsWith("---") ||
              line.trim().startsWith("*/")
            ) {
              return (
                <span key={idx} style={{ color: "#19aa51" }}>
                  {line}
                  {idx < lines.length - 1 ? "\n" : ""}
                </span>
              );
            }

            return (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 ? "\n" : ""}
              </span>
            );
          }),

          showCursor && (
            <span
              ref={cursorRef}
              className={`ml-1 inline-block ${
                shouldHideCursor ? "hidden" : ""
              } ${cursorClassName}`}
            >
              {cursorCharacter}
            </span>
          ),
        ];
      })()}
    </span>
  );
};

export default TextType;
