export function splitText(el:any):HTMLSpanElement[]{
    const letters = el?.textContent?.split("")
    let spans = [] as HTMLSpanElement[]
    el?.classList?.add('flex')
    el?.classList?.add('justify-start')
    el?.classList?.add('items-center')
    if(typeof document !== undefined){
        letters?.forEach((l:string)=>{
            const span = document.createElement('span') as HTMLSpanElement
            span.classList.add('letter')
            span.classList.add('block')
            span.classList.add('mr-1')
            span.textContent = l
            spans.push(span)
        })
    }
    return spans
}