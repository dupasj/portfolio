import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const queue: Element[] = []

    const computePoint = (rect: DOMRect) => {
        return (rect.top * window.innerWidth) + rect.left;
    }

    const reveal = () => {
        const filter = queue.map((a) => {
            const rect = a.getBoundingClientRect();
            return [a,rect]
        }).filter(a => a[1].top < window.innerHeight);
        const ordered = filter.sort((a,b) => computePoint(a[1]) - computePoint(b[1])).map(a => a[0]);

        const element = ordered[0];

        if (!(element instanceof Element)){
            setTimeout(reveal,75);
            return;
        }

        element.classList.add("scroll-animated");

        while (true){
            const index = queue.indexOf(element);
            if (index < 0){
                break;
            }

            queue.splice(index,1)
        }

        setTimeout(reveal,75 / Math.pow(filter.length,0.1));
    }

    nuxtApp.hook('app:mounted', () => {
        const observer = new MutationObserver(details => {
            details.forEach(detail => {
                const target = detail.target;
                if (target instanceof Element){
                    queue.push(... document.querySelectorAll(".scroll-animation:not(.scroll-animated)"))
                    return
                }
            })
        });

        observer.observe(document.body, { childList: true, subtree: true });
        queue.push(... document.querySelectorAll(".scroll-animation:not(.scroll-animated)"))

        setTimeout(reveal,75)



        let timeout: NodeJS.Timeout|null = null;
        document.addEventListener('scroll', () => {
            if (timeout !== null){
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(scrolled,150);
        });
        const scrolled = () => {
            const threshold = window.innerHeight * 0.2;
            const elements = document.querySelectorAll('.snap');

            const __elements: [Element,DOMRect][] = Array.from(elements).map(element => [
                element,
                element.getBoundingClientRect()
            ])

            for(let index=0;index<__elements.length;index++){
                const element = __elements[index];

                const topDistance = index < (__elements.length - 1) ? Math.abs(element[1].top) : element[1].top;
                if (topDistance === 0){
                    return;
                }
                if (topDistance < threshold && topDistance > 0){
                    console.log(window.scrollY + element[1].top,topDistance)
                    window.scrollTo({
                        top: window.scrollY + element[1].top,
                        behavior: 'smooth'
                    });
                    return
                }
            }

            /*
            for(const element of __elements){
                const bottomDistance = Math.abs(element[1].bottom - window.innerHeight);
                if (bottomDistance < 200){
                    console.log(window.scrollY + element[1].bottom - window.innerHeight)
                    window.scrollTo({
                        top: window.scrollY + element[1].bottom - window.innerHeight,
                        behavior: 'smooth'
                    });
                    return
                }
            }
             */
        }
    });
})
