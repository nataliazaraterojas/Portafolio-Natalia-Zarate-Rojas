#!/bin/bash

# Script para publicar el portafolio en GitHub
# Uso: ./deploy.sh TU_USUARIO_GITHUB NOMBRE_REPOSITORIO

echo "🚀 Preparando proyecto para publicación..."
echo ""

# Verificar que se proporcionaron los argumentos
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Error: Necesitas proporcionar tu usuario de GitHub y el nombre del repositorio"
    echo ""
    echo "Uso: ./deploy.sh TU_USUARIO_GITHUB NOMBRE_REPOSITORIO"
    echo "Ejemplo: ./deploy.sh nataliazarate portafolio"
    echo ""
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "📋 Configuración:"
echo "   Usuario: $GITHUB_USER"
echo "   Repositorio: $REPO_NAME"
echo "   URL: $REPO_URL"
echo ""

# Verificar si ya existe un remote
if git remote -v | grep -q "origin"; then
    echo "⚠️  Ya existe un remote 'origin'"
    read -p "¿Deseas actualizarlo? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        git remote set-url origin $REPO_URL
        echo "✅ Remote actualizado"
    else
        echo "❌ Operación cancelada"
        exit 1
    fi
else
    echo "➕ Agregando remote..."
    git remote add origin $REPO_URL
    echo "✅ Remote agregado"
fi

# Verificar que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Cambiando a rama main..."
    git branch -M main
    echo "✅ Ahora estás en la rama main"
fi

# Hacer push
echo ""
echo "📤 Subiendo código a GitHub..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Proyecto publicado exitosamente!"
    echo ""
    echo "🌐 Próximos pasos:"
    echo "   1. Ve a https://github.com/${GITHUB_USER}/${REPO_NAME}"
    echo "   2. Sigue las instrucciones en DEPLOY.md para desplegar en Netlify/Vercel"
    echo ""
    echo "📖 Lee DEPLOY.md para más información"
else
    echo ""
    echo "❌ Error al subir el código"
    echo "   Asegúrate de que:"
    echo "   - El repositorio existe en GitHub"
    echo "   - Tienes permisos para escribir en el repositorio"
    echo "   - Tu usuario y contraseña/token son correctos"
    exit 1
fi

