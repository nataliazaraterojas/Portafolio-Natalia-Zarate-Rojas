# 🚀 Guía de Despliegue - Portafolio

Esta guía te ayudará a publicar tu portafolio en diferentes plataformas.

## 📋 Pre-requisitos

- Cuenta de GitHub
- Cuenta en Netlify, Vercel o GitHub Pages (elige una)

---

## 🌐 Opción 1: Netlify (Recomendado)

### Paso 1: Subir a GitHub

1. **Crea un repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `portafolio` (o el que prefieras)
   - Marca como **Público**
   - **NO** marques "Add a README file"
   - Click en "Create repository"

2. **Conecta tu proyecto local:**
   ```bash
   cd /Users/nataliazaraterojas/Desktop/Portafolio
   git remote add origin https://github.com/TU_USUARIO/portafolio.git
   git branch -M main
   git push -u origin main
   ```
   ⚠️ Reemplaza `TU_USUARIO` con tu usuario de GitHub

### Paso 2: Desplegar en Netlify

1. Ve a https://app.netlify.com
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y autoriza la conexión
4. Elige tu repositorio `portafolio`
5. Configuración:
   - **Build command:** (dejar vacío)
   - **Publish directory:** `/` (raíz)
6. Click en **"Deploy site"**
7. ¡Listo! Tu sitio estará en `tu-sitio.netlify.app`

### Personalizar dominio (Opcional)

1. En Netlify, ve a **Site settings** → **Domain management**
2. Click en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio

---

## ⚡ Opción 2: Vercel

### Paso 1: Subir a GitHub
(Sigue los mismos pasos del Paso 1 de Netlify)

### Paso 2: Desplegar en Vercel

1. Ve a https://vercel.com
2. Click en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Configuración:
   - **Framework Preset:** Other
   - **Root Directory:** `.`
5. Click en **"Deploy"**
6. ¡Listo! Tu sitio estará en `tu-sitio.vercel.app`

---

## 📄 Opción 3: GitHub Pages

### Paso 1: Subir a GitHub
(Sigue los mismos pasos del Paso 1 de Netlify)

### Paso 2: Activar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings**
2. En el menú lateral, click en **Pages**
3. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/` (root)
4. Click en **Save**
5. Espera unos minutos
6. Tu sitio estará en `TU_USUARIO.github.io/portafolio`

---

## 🔄 Actualizar el sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Netlify/Vercel/GitHub Pages actualizarán automáticamente el sitio.

---

## ✅ Verificación

Después de desplegar, verifica que:
- ✅ Todas las páginas cargan correctamente
- ✅ Las imágenes se muestran
- ✅ Los enlaces funcionan
- ✅ El diseño es responsive en móvil
- ✅ Las animaciones funcionan

---

## 🆘 Problemas comunes

### Las imágenes no se muestran
- Verifica que las rutas en HTML sean relativas: `assets/imagen.png`
- Asegúrate de que todas las imágenes estén en la carpeta `assets/`

### Error 404 en páginas
- Verifica que los nombres de archivos HTML sean correctos
- Asegúrate de que los enlaces usen rutas relativas

### El sitio no se actualiza
- Espera 1-2 minutos después de hacer push
- Verifica que el build fue exitoso en la plataforma

---

## 📞 Soporte

Si tienes problemas, revisa:
- Los logs de build en Netlify/Vercel
- La consola del navegador (F12)
- Los archivos de configuración (netlify.toml, vercel.json)


