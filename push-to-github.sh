#!/bin/bash

echo "🚀 Subiendo portafolio a GitHub..."
echo ""

cd /Users/nataliazaraterojas/Desktop/Portafolio

echo "📤 Ejecutando git push..."
echo ""
echo "⚠️  Cuando te pida credenciales:"
echo "   Username: nataliazaraterojas"
echo "   Password: Usa un Personal Access Token (no tu contraseña)"
echo ""
echo "   Si no tienes token, créalo en:"
echo "   https://github.com/settings/tokens/new"
echo "   (Selecciona el scope 'repo')"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Código subido exitosamente!"
    echo ""
    echo "🌐 Tu repositorio está en:"
    echo "   https://github.com/nataliazaraterojas/Portafolio-Natalia-Zarate-Rojas"
    echo ""
    echo "📖 Próximo paso: Despliega en Netlify siguiendo DEPLOY.md"
else
    echo ""
    echo "❌ Error al subir. Verifica tus credenciales."
fi


