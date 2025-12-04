# 🚀 Instrucciones para Subir a GitHub (2 minutos)

## Paso 1: Crear Token de GitHub (1 minuto)

1. **Abre este link:** https://github.com/settings/tokens/new
2. **Nombre del token:** `Portafolio Push`
3. **Expiración:** Elige 90 días (o el que prefieras)
4. **Selecciona el scope:** Marca la casilla completa de **`repo`** (esto da acceso a repositorios)
5. **Click en:** "Generate token" (abajo)
6. **IMPORTANTE:** Copia el token inmediatamente (empieza con `ghp_...`)
   - ⚠️ Solo se muestra una vez, guárdalo bien

## Paso 2: Subir el código (1 minuto)

### Opción A: Usando el script (más fácil)

Abre la Terminal y ejecuta:

```bash
cd /Users/nataliazaraterojas/Desktop/Portafolio
./push-to-github.sh
```

Cuando te pida:
- **Username:** `nataliazaraterojas`
- **Password:** Pega el token que copiaste (no tu contraseña de GitHub)

### Opción B: Comando directo

```bash
cd /Users/nataliazaraterojas/Desktop/Portafolio
git push -u origin main
```

Cuando te pida:
- **Username:** `nataliazaraterojas`
- **Password:** Pega el token que copiaste

## ✅ Listo!

Una vez que termine, verás:
```
✅ ¡Código subido exitosamente!
```

Tu repositorio estará en:
**https://github.com/nataliazaraterojas/Portafolio-Natalia-Zarate-Rojas**

## 🌐 Próximo paso: Desplegar en Netlify

1. Ve a: https://app.netlify.com
2. "Add new site" → "Import an existing project"
3. Conecta con GitHub
4. Selecciona: `Portafolio-Natalia-Zarate-Rojas`
5. Deploy settings:
   - Build command: (vacío)
   - Publish directory: `/`
6. Click en "Deploy site"

¡Y listo! Tu portafolio estará online 🎉

