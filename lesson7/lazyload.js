//Get all images with data-src attribute
const imagesToLoad = document.querySelectorAll("img[data-src]");

//Optional parameters being set for the IntersectionObserver
const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {image.removeAttribute('data-src');};
};

//First check to see if IntersectionalObserver is supported
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if(item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
              }
        });
    }, imgOptions);
//Loop through each image on check status and load if necessary
imagesToLoad.forEach((img) => {
    imgObserver.observe(img);
});
}
//Load all images if not supported
else{
    imagesToLoad.forEach((img) => {
        loadImages(img);
      });
}