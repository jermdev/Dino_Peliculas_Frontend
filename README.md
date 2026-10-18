# Dino Películas Frontend

Bienvenido al repositorio del frontend de Dino Películas, una aplicación web moderna diseñada para consumir y visualizar un catálogo completo de películas. Este proyecto está construido con React y TypeScript, enfocándose en ofrecer una interfaz de usuario limpia, rápida y escalable.

## Propósito del Proyecto

Es ser un MVP de una aplicacion de Peliculas. Dando la experecienca de visualizacion de Peliculas en
Español. Buscando estraer lo minimo necesario de una aplicacion de peliculas.

El objetivo de la creacion, es Brindar un servicio de divulgacion de Peliculas gratuitamente. Sin anuncions para mejorar la esperiencia.


## Características Principales

Exploración de Catálogo: Navega a través de una amplia variedad de películas de manera fluida.

Detalles de Películas: Vistas específicas con toda la información relevante de cada título.

Componentes Modulares: Interfaz construida a base de componentes reutilizables y escalables.

Tipado Estricto: Código robusto y autodescriptivo gracias a TypeScript.

## 📂 Estructura del Proyecto

A continuación, se detalla la organización de los directorios y archivos más importantes dentro del código fuente:

Dino_Peliculas_Frontend/
├── public/               # Archivos estáticos públicos (favicon, etc.)
├── src/
│   ├── adapter/          #Adaptador de la estrcutura de la repuesta de peliculas
│   │   ├── movieAdapter.ts 
│   ├── api/              # Conexion con la api de consulta y repuesta, Home, Feed, Movie.
│   │   ├── apiClient.ts
│   │   ├── HttpClient.ts
│   │   ├── MovieClient.ts
│   │   ├── MovieResponse.ts
│   ├── components/       # Componentes de UI reutilizables (Navbar, MovieCard, etc.)
│   │   ├── BarrSearch.tsx
│   │   ├── categorySection.tsx
│   │   ├── Loading.tsx
│   │   ├── SectionHome.tsx
│   │   ├── ViewMovie.tsx
│   ├── pages/            # Vistas principales de la aplicación (Home, MovieDetail, etc.)
│   │   ├── Home.tsx
│   ├── services/         # Lógica de conexión y llamadas a la API externa/Backend
│   │   ├── ShowService.tsx
│   ├── styles/           # Estylos aplicados directamente a los componentes de React
│   │   ├── BarrSearchStyle.css
│   │   ├── HomeStyle.css
│   │   ├── LoadingStyle.css
│   │   ├── Section.css
│   │   ├── viewMovieStyle.css
│   ├── types/            # Definiciones de tipos e interfaces de TypeScript
│   │   ├── AutocompleateSearch.ts
│   │   ├── HomeFeed.ts
│   │   ├── HomeFeedSection.ts
│   │   ├── Movie.ts
│   │   ├── OverViewMovie.ts
│   │   ├── PreviewMovie.ts
│   ├── utils/            # Funciones auxiliares y helpers
│   │   ├── valueObjects/
│   │   │   ├── AutocompleateSearchValidation.ts
│   │   │   ├── getHomeValidation.ts
│   │   │   ├── getMovieByIdValidation.ts
│   │   │   ├── HomeFeedValidation.ts
│   ├── App.tsx           # Componente raíz que maneja el layout o rutas principales
│   └── main.tsx          # Punto de entrada de la aplicación en React
├── .gitignore            # Archivos y carpetas ignorados por Git
├── package.json          # Dependencias y scripts del proyecto
├── README.md             # Documentación del proyecto (este archivo)
└── tsconfig.json         # Configuración del compilador de TypeScript


## Instalación y Uso local

Sigue estos pasos para ejecutar la aplicación en tu entorno de desarrollo local.

Prerrequisitos

Tener instalado Node.js.

Pasos para levantar el proyecto

Clona este repositorio en tu máquina local:

git clone https://github.com/jermdev/Dino_Peliculas_Frontend.git


Ingresa a la carpeta del proyecto:

cd Dino_Peliculas_Frontend


Instala todas las dependencias necesarias:

npm install


Ejecuta el servidor de desarrollo:

npm run dev


## Nota del Desarrolador
El propocito personal que le di a este pequeño proyecto es poder aprender a conectar diferentes servicios
tanto frontend , servidor backend, bot-scraper. Este proyecto es solo una parte de la totalidad del sistema en el que trabajé.
Respecto al uso de IA, trate de no utilizarla para comprender desde la creacion, desplieque y 
mantenimiento del sistema. Para el desarrollo se utilizo claude para un diseño 