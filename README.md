# aves-humedales-web 🌿🕊️

Esta es una aplicación web interactiva para la detección de aves en imágenes, desarrollada con el modelo entrenado en [Roboflow](https://roboflow.com) para reconocer especies presentes en los humedales de Córdoba, Colombia.

## 🧠 Modelo IA

La app usa el modelo `aves_humedales` versión 2 de Roboflow. La inferencia se hace directamente vía API utilizando JavaScript.

## 📂 ¿Qué incluye?

- `index.html`: interfaz para subir imágenes.
- `script.js`: lógica para enviar la imagen a la API.
- `style.css`: estilos personalizados.
- Configurable para mostrar etiquetas, cambiar confianza mínima y superposición.

## 🚀 Cómo usar

1. Sube una imagen.
2. Ajusta los parámetros de confianza o clases si lo deseas.
3. Presiona "Run Inference" y observa los resultados directamente en la imagen.

## 🔗 Integración con StoryMap

Puedes incrustar esta app como un iframe en un StoryMap de ArcGIS para hacerla accesible a estudiantes o comunidades rurales, así:

```html
<iframe src="https://aves-humedales-web.vercel.app" width="100%" height="600px"></iframe>
