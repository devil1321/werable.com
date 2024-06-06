import gsap from "gsap"

export const handleSidebar = (isSidebar:boolean,UIActions:any) =>{
    if(typeof window !== 'undefined'){
        const sidebar = document.querySelector('.admin-sidebar') as HTMLDivElement
        if(!isSidebar){
            gsap.fromTo('.admin-nav-hamburger span:first-of-type',{ rotate:'0deg'},{ rotate:'45deg',duration:0.7,transformOrigin:'5px 2px'})
            gsap.fromTo('.admin-nav-hamburger span:nth-of-type(2)',{ opacity:1},{ opacity:0,duration:0.5})
            gsap.fromTo('.admin-nav-hamburger span:last-of-type',{ rotate:'0deg'},{ rotate:'-45deg',duration:0.7,transformOrigin:'5px 2px'})
            sidebar.style.transform = 'translateX(0%)'
            UIActions.setIsSidebar(true)
        }else{
            gsap.fromTo('.admin-nav-hamburger span:first-of-type',{ rotate:'45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
            gsap.fromTo('.admin-nav-hamburger span:nth-of-type(2)',{ opacity:0},{ opacity:1,duration:0.5})
            gsap.fromTo('.admin-nav-hamburger span:last-of-type',{ rotate:'-45deg'},{ rotate:'0deg',duration:0.7,transformOrigin:'5px 2px'})
            sidebar.style.transform = 'translateX(-100%)'
            UIActions.setIsSidebar(false)
            }
        }
    }