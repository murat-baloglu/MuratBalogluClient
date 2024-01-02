


function patientCommentsCarousel() {
    let items = document.querySelectorAll('#recipeCarousel .carousel-item');
    items.forEach((el) => {
        const minPerSlide = 3
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })

}
patientCommentsCarousel();
window.onclick = function () {
    patientCommentsCarousel()
};



$(function () {
    $(".scrollTop").on("click", function () {
        $("html, body").animate({ "scrollTop": 0 });
    });
})