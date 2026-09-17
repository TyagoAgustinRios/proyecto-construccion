const tarjetasServicio = document.querySelectorAll(".servicio-card");
const botonComprobante = document.querySelector(".hero-btn");


tarjetasServicio.forEach((tarjeta) => {
 
  tarjeta.addEventListener("mouseover", () => {
   
    tarjeta.style.transform = "translateY(-5px)";
    tarjeta.style.transition = "all 0.3s ease";
    tarjeta.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
  });

  
  tarjeta.addEventListener("mouseout", () => {
    tarjeta.style.transform = "translateY(0)";
    tarjeta.style.boxShadow = "none";
  });
});


if (botonComprobante) {
  botonComprobante.addEventListener("click", (evento) => {
   
    const destino = botonComprobante.getAttribute("href");


    console.log("Redirigiendo a:", destino);

  
    const confirmar = confirm("¿Deseas ir a la sección de retiro de comprobante?");
    
    if (!confirmar) {
      evento.preventDefault(); 
    }
  });
}