let CONFIG = {
    rootMargin: "0 0 100px 0"
}
class LazyLoader {
    constructor(el, config={root, rootMargin, src, element, loadingClassName:'loading', loadedClassName:'loaded'}) {
        if(config) {
            CONFIG = {
                ...CONFIG,
                ...config
            }
        }
        this.#observer = this.#observer || new IntersectionObserver(this.#callback, CONFIG);
        if(el) {
            this.#observer.observe(el);
        }
    }

    #callback(entries){
        entries.forEach(item => {
            if(item.isIntersecting){
                const img = new Image();
                img.src = item.dataset.src;
                img.onload = () => {
                    item.classList.remove(CONFIG.loadingClassName);
                    item.classList.add(CONFIG.loadedClassName);
                    this.#observer.unobserve(item);
                    return item.tagName === 'IMG' ? item.src = img.src : item.style.backgroundImage = `url(${img.src})`;
                }
            }
        });
    }

    static all(){
        const items = document.querySelectorAll(`[data-src]:not(.${CONFIG.loadedClassName}):not(.${CONFIG.loadingClassName})`);
        this.#observers = this.#observers || (new Map());
        this.#observer = this.#observer || new IntersectionObserver(this.#callback, CONFIG);
        items.forEach((item, index) => {
            const options = {
                threshold: 0.01
            }

            item.classList.add(CONFIG.loadingClassName);
            this.#observer.observe(item);
            //this.#observers.set(item, (new IntersectionObserver(options, callback)));
        })
    }
}