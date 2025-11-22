import { useEffect, useState } from "react";
import TextType from "./text-type";
import { GetDateFromActually } from "./timer";

interface TextTypeProps {
  isLoaded: boolean;
}

export function GetDataInfo({ isLoaded }: TextTypeProps) {
  const cartaCodigo = `/*
--- THE CODE CARTITA OF AMORS ---
 */
Mi pequeña gatita ❤️,

Sé que no soy el mejor escribiendo cartitas,
y tampoco sé si tengas mucho tiempo para leer esto...
// Quiero que sepas cuánto me esfuerzo y lo importante que eres para mí

Pero aun así quiero que sepas que me esfuerzo, porque quiero demostrarte cuánto te amo
(y también mi leve capacidad de programar :b).

/* Perdon.txt */
Perdón por estos días, y por aquel momento que te hice pasar la otra vez.
Prometo que el sueño hace cosas raras, pero aun así quiero ser alguien que siempre te dé paz, no preocupación.
Quiero que sepas que, aunque entre semana esté lleno de trabajo y con la cabeza hecha bolas, tú siempre apareces en mi mente.

/* Presencia.txt */
No sé qué tan sano sea, pero la verdad es que pensar en ti me anima, me impulsa, me da fuerza cuando siento que ya no puedo más.
Me sorprende lo que puedo llegar a hacer solo por querer verte sonreír.
// Me encanta tu sonrisa... y cuidarte... y ojalá pueda ser esa persona que despierte en ti sentimientos bonitos, seguros, ese amor suave y cálido que tú mereces.

> if (te_sientes_triste || te_hace_falta_un_abrazo) {
>     Vuelve a esta página cuando lo necesites
> }

/* Juntos.txt */
Quiero seguir actualizándola con notitas para ti.
O quizá haga otras nuevas.
No sé, solo sé que quiero seguirte haciendo regalitos para mostrarte el cariño tan dulce que siento por ti.

Amo nuestros encuentros: 
// románticos, privados, flexibles, juegos, charlas largas, despensa, días normales, días especiales

/* Cierre personalizado */
Me fascina eso de nosotros: que somos todo, de formas bonitas, de formas reales, de formas que se sienten como hogar.

Con cariño (y un cachito de sueño, pero más amor), Issy ❤️`;
  const [isDateActive, setIsDateActive] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsDateActive(true);
      }, 25000);
    }
  }, [isLoaded]);

  return (
    <>
      <div className="w-full md:w-[50vw] my-1" style={{ textAlign: "start" }}>
        <div
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            paddingRight: 8,
          }}
        >
          {isLoaded && (
            <TextType
              text={[
                "Inicializando conexión... 💻",
                "Conectando al servidor de mi corazón... ❤️‍🩹",
                "Acceso concedido. ✅",
                cartaCodigo,
              ]}
              typingSpeed={20} // Velocidad para escribir letra
              deletingSpeed={40} // Velocidad para borrar
              pauseDuration={2000} // Pausa entre frases
              showCursor={true} // Mostrar cursor "|"
              cursorCharacter="|" // Cambia el cursor si quieres
              loop={false} // No repite frases infinitamente
              initialDelay={500} // Espera antes de empezar
              className="text-black block"
              as="div"
            />
          )}
          {isLoaded && isDateActive && (
            <div className="flex flex-row">
              <GetDateFromActually dateInit={new Date("2020-08-25")} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
