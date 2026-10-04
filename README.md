# Núcleo OS // Cockpit Personal v4.10

> **Personal Operating System & Tactical HUD**  
> Suite de alto rendimiento para preparación ENARM, control financiero estricto, telemetría biomédica y copiloto clínico con inferencia Ground-Truth (Google AI Studio // Gemini 2.0 Flash).

---

## ⚡ Descripción General

**Núcleo OS** es una aplicación web táctica, offline-first y de latencia cero (*0ms bus local*) diseñada para ejecutarse como Web App nativa (PWA) en navegadores modernos de escritorio, iPadOS e iOS sin requerir servidores complejos ni herramientas de compilación externas.

### 🎯 Pilares del Sistema

1. **Matriz Táctica ENARM:** Repasos espaciados, banco de preguntas CENETEC, simulación de casos y ruleta de estudio ponderada por debilidad clínica.
2. **Núcleo Financiero:** Cálculo en tiempo real de *Dinero Libre*, simulador matemático de deudas bajo estrategia **Avalancha** (ordenado por CAT decreciente) y registro rápido de transacciones.
3. **Telemetría & Cockpit Biológico:** Registro de estado (sueño, energía, concentración, metilfenidato) y conmutador rápido de **Modo Guardia** para reducir metas a mínimos viables durante turnos hospitalarios.
4. **Segundo Cerebro & Google AI Studio:** Integración oficial con **Gemini 2.0 Flash** bajo protocolo estricto de no-alucinación, referenciando Guías de Práctica Clínica (GPC).
5. **Comandos ⌘K:** Paleta táctica accesible con `⌘K` o `Ctrl+K` para capturar gastos (`+gasto 150 comida`), activar guardia o consultar al copiloto clínico de inmediato.

---

## 🚀 Despliegue en GitHub Pages (Paso a Paso)

Para tener tu aplicación en línea y accesible desde tu iPhone, iPad y computadora:

1. **Subir el archivo principal:**
   - Asegúrate de que el archivo principal de la aplicación se llame exactamente **`index.html`** y esté en la raíz de tu repositorio (como ya se muestra en tu lista de archivos).
2. **Activar GitHub Pages:**
   - Ve a la pestaña **Settings** (Configuración) de tu repositorio.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En la sección **Build and deployment** > **Source**, elige **Deploy from a branch**.
   - En **Branch**, selecciona `main` y la carpeta `/(root)`. Haz clic en **Save**.
3. **Acceder a la Web App:**
   - En 1 o 2 minutos, GitHub te proporcionará tu enlace público:  
     `https://jperezc2026.github.io/HABITOS-2.0/`

---

## 📲 Instalación en iPad & iPhone (PWA)

1. Abre tu enlace de GitHub Pages en **Safari**.
2. Toca el botón **Compartir** (cuadrado con flecha hacia arriba).
3. Selecciona **"Agregar a pantalla de inicio"** (*Add to Home Screen*).
4. La aplicación se ejecutará a pantalla completa, con soporte offline y comportamiento idéntico a una app nativa.

---

## 🔐 Privacidad, Seguridad y Bóveda de Datos

- **Offline-First:** Toda la telemetría, saldos bancarios y notas clínicas se almacenan en el navegador mediante **IndexedDB v2.1** (sin límite de 5 MB de localStorage).
- **Cero exposición de credenciales:** Tu clave de Google AI Studio y tokens de sincronización se guardan localmente cifrados en tu dispositivo; nunca se suben ni quedan expuestos en el código público de GitHub.

---

*Kernel v4.10-rt · Sistema Operativo Personal Núcleo*
