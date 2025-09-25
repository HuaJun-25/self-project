import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Lenis from "@studio-freight/lenis";
import $ from "jquery";

import '../scss/home.scss';

import home1 from '../images/home1.avif';
import work1 from '../images/28.avif';
import work2 from '../images/07.png';
import work3 from '../images/08.png';
import work4 from '../images/27.avif';
import work5 from '../images/15.png';
import work6 from '../images/11.avif';
import work7 from '../images/31.avif';
import item1 from '../images/item01.avif';
import item2 from '../images/item02.png';
import item3 from '../images/25.png';
import item4 from '../images/item04.avif';
import item1a from '../images/01-2.png';
import item2a from '../images/02-2.png';
import item3a from '../images/03-2.png';
import item4a from '../images/04-2.png';
import process1 from '../images/process01.avif';
import process2 from '../images/process02.avif';
import notice1 from '../images/01.png';
import notice2 from '../images/02.png';
import notice3 from '../images/03.png';
import notice4 from '../images/04.avif';
import notice5 from '../images/05.png';
import notice6 from '../images/06.png';
import notice7 from '../images/13.png';
import notice8 from '../images/16.avif';
import notice9 from '../images/17.png';
import notice10 from '../images/23.png';
import notice11 from '../images/26.png';
import ani01 from '../images/ani01.gif';
import ani02 from '../images/ani02.gif';
import space01 from '../images/deco02.png';
import space02 from '../images/deco01.avif';
import space03 from '../images/char03.png';





gsap.registerPlugin(Draggable, ScrollTrigger);

// works-照片
const worksimgs = [
    work1, work2, work4, work3, work5, work6, work7,
];
// item-照片
const itemsimgs = [
    {
        id: 1,
        ImgSrc: item1,
        title: "雙人插圖",
        desc: "半身人物占比為主｜含簡單背景｜互動請附上簡單設定",
        Imgline: item1a,
        price: '',
    },
    {
        id: 2,
        ImgSrc: item2,
        title: "全身插圖",
        desc: "含簡單裝飾背景｜須提供主題｜不收雙人",
        Imgline: item2a,
        price: '',
    },
    {
        id: 3,
        ImgSrc: item3,
        title: "黑白頁漫",
        desc: "題材/頁數皆有限制，依格數內容報價幅度大｜較擅長簡單小互動的劇情",
        Imgline: item3a,
        price: '',
    },
    {
        id: 4,
        ImgSrc: item4,
        title: "滿版插圖",
        desc: "保底 2半身+1Q版｜須提供主題",
        Imgline: item4a,
        price: '',
    },
];

const Home = () => {

    // navbar
    useEffect(() => {
        $('.hamburger').on("click", function () {
            console.log("click");
            $(this).toggleClass('is-active');
            $('.menu').toggleClass('show');
        });

        // 卸載元件時，移除事件監聽器，避免記憶體洩漏
        return () => {
            $('.hamburger').off("click");
        };
    }, []);

    // 封面 ---------------------------------------
    const herocontentRef = useRef(null);
    const heroimgRef = useRef(null);
    const himgRef = useRef(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!herocontentRef.current || !heroimgRef.current || !himgRef.current) return;

        // 初始與目標縮放值
        // const fromClip = "polygon(37.5% 20%, 62.5% 20%, 62.5% 80%, 37.5% 80%)";
        // const toClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        // const fromRotate = 30;
        // const toRotate = 0;

        // header 左側文字動畫
        gsap.to(".hero-text .letters:first-child", {
            x: () => -window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: "+=200%",
                scrub: 1,
            },
        });

        // header 右側文字動畫
        gsap.to(".hero-text .letters:last-child", {
            x: () => window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: "+=200%",
                scrub: 1,
            },
        });

        const heroimgTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-content",
                start: "top top",
                end: "+=200%", // 與 hero-img clip-path 動畫相同
                scrub: 1,
                pin: true,     // 如果 hero-img 有 pin
            },
        });
        heroimgTimeline.fromTo(".hero-img",
            {
                clipPath: "polygon(37.5% 20%, 62.5% 20%, 62.5% 80%, 37.5% 80%)",
                WebkitClipPath: "polygon(37.5% 20%, 62.5% 20%, 62.5% 80%, 37.5% 80%)",
                rotate: "30deg",
            },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                WebkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                rotate: "0deg",
                ease: "power2.inOut",
            }
        );

        // img 縮放
        heroimgTimeline.fromTo(".hero-img img",
            { scale: 2 },
            { scale: 1, ease: "power2.inOut" },
            0 // 對齊時間線開始
        );

        // 卸載元件時把gsap動畫釋放，防記憶體洩漏
        return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
    }, []);

    // work區 ---------------------------------------
    const wrapperRef = useRef(null);
    const worksimgRef = useRef(null);
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = worksimgRef.current;
        if (!wrapper || !track) return;
        const scrollRef = { current: 0 }; // 儲存目前進度 (0 ~ 1)

        // 內部圖片偏移
        const updateTrackAndImages = (scrollValue) => {
            const leftPercent = 20 - scrollValue * 100;
            gsap.to(track, {
                left: `${leftPercent}%`,
                duration: 0.5,
                ease: "power3.out"
            });

            const imgs = track.getElementsByClassName("wimage");
            for (const img of imgs) {
                gsap.to(img, {
                    objectPosition: `${100 - scrollValue * 100}% 50%`,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        };

        // track 寬度差值
        const trackWidth2 = track.scrollWidth - wrapper.offsetWidth - 500;

        // ScrollTrigger 控制水平滾動
        gsap.to(track, {
            x: -trackWidth2,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: () => `+=${trackWidth2 * 5}`,
                scrub: 2,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    scrollRef.current = self.progress; // progress: 0~1
                    updateTrackAndImages(scrollRef.current);
                }
            }
        });

        // Draggable 控制
        // const trackWidth = track.scrollWidth - track.parentElement.offsetWidth;
        // Draggable.create(track, {
        //     type: "x",
        //     bounds: { minX: -trackWidth, maxX: 0 },
        //     inertia: true,
        //     // cursor: "none",
        //     onDrag() {
        //         // 根據拖曳距離計算 scrollRef
        //         scrollRef.current = -this.x / trackWidth;
        //         updateTrackAndImages(scrollRef.current);
        //     },
        //     onThrowUpdate() {
        //         scrollRef.current = -this.x / trackWidth;
        //         updateTrackAndImages(scrollRef.current);
        //     },
        // });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            gsap.killTweensOf(track);
        };
    }, []);

    // item區 ---------------------------------------
    const [displayImg, setDisplayImg] = useState(itemsimgs[3]?.Imgline || "");
    const [renderedItem, setRenderedItem] = useState(null); // 目前展開的 item
    const contentRefs = useRef({});
    const imgRef = useRef(null); // 左邊圖片的 ref
    /*
        const toggleItem = (id, imgSrc) => {
            if (renderedItem === id) {
                // 如果再次點擊同一個 → 收合
                gsap.to(contentRefs.current[id], {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                });
                setRenderedItem(null);
            } else {
                // 先收合舊的
                if (renderedItem && contentRefs.current[renderedItem]) {
                    gsap.to(contentRefs.current[renderedItem], {
                        height: 0,
                        duration: 0.5,
                        ease: "power2.inOut",
                    });
                }
                // 展開新的
                setRenderedItem(id);
                gsap.fromTo(
                    contentRefs.current[id],
                    { height: 0 },
                    { height: "auto", duration: 0.5, ease: "power2.inOut" }
                );
                // 點擊時固定左邊大圖
                gsap.fromTo(
                    imgRef.current,
                    { opacity: 0.6 },
                    {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        onStart: () => setDisplayImg(imgSrc),
                    }
                );
            }
        };*/
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const bgImgRef = useRef(null); // 背景圖片

    const handleMouseEnter = (item) => {
        if (isHoverDisabled || renderedItem) return; // 如果被禁用或有展開的項目，不執行 hover

        // 設置背景圖片為當前顯示的圖片
        if (bgImgRef.current) {
            bgImgRef.current.src = displayImg;
        }

        // 設置前景圖片為新圖片
        if (imgRef.current) {
            imgRef.current.src = item.Imgline;
        }

        // GSAP 剪裁動畫：從右到左顯示
        gsap.fromTo(imgRef.current,
            {
                clipPath: "inset(0 100% 0 0)" // 初始狀態：完全被右邊遮蔽
            },
            {
                clipPath: "inset(0 0% 0 0)", // 結束狀態：完全顯示
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    // 動畫完成後更新背景圖片和狀態
                    setDisplayImg(item.Imgline);
                    if (bgImgRef.current) {
                        bgImgRef.current.src = item.Imgline;
                    }
                }
            }
        );
    };

    const handleMouseLeave = () => {
        if (isHoverDisabled || renderedItem) return;

        // 回到預設圖片
        const defaultImg = itemsimgs[3]?.Imgline || "";

        if (displayImg !== defaultImg) {
            // 設置背景為當前圖片
            if (bgImgRef.current) {
                bgImgRef.current.src = displayImg;
            }

            // 設置前景為預設圖片
            if (imgRef.current) {
                imgRef.current.src = defaultImg;
            }

            // 剪裁動畫
            gsap.fromTo(imgRef.current,
                {
                    clipPath: "inset(0 100% 0 0)"
                },
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        setDisplayImg(defaultImg);
                        if (bgImgRef.current) {
                            bgImgRef.current.src = defaultImg;
                        }
                    }
                }
            );
        }
    };

    const toggleItem = (id, imgSrc) => {
        if (renderedItem === id) {
            // 收合
            gsap.to(contentRefs.current[id], {
                height: 0,
                duration: 0.5,
                ease: "power2.inOut",
            });
            setRenderedItem(null);
            setIsHoverDisabled(false); // 重新啟用 hover
        } else {
            // 先收合舊的
            if (renderedItem && contentRefs.current[renderedItem]) {
                gsap.to(contentRefs.current[renderedItem], {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                });
            }

            // 展開新的
            setRenderedItem(id);
            setIsHoverDisabled(true); // 禁用 hover

            gsap.fromTo(
                contentRefs.current[id],
                { height: 0 },
                { height: "auto", duration: 0.5, ease: "power2.inOut" }
            );

            // 圖片切換動畫
            if (displayImg !== imgSrc) {
                // 設置背景圖片
                if (bgImgRef.current) {
                    bgImgRef.current.src = displayImg;
                }

                // 設置前景圖片
                if (imgRef.current) {
                    imgRef.current.src = imgSrc;
                }

                // 剪裁切換動畫
                gsap.fromTo(imgRef.current,
                    {
                        clipPath: "inset(0 0 0 100%)"
                    },
                    {
                        clipPath: "inset(0 0 0 0%)",
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => {
                            setDisplayImg(imgSrc);
                            if (bgImgRef.current) {
                                bgImgRef.current.src = imgSrc;
                            }
                        }
                    }
                );
            }
        }
    };

    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1442px)", () => {
            gsap.fromTo(".item-left",
                { x: "24vw", y: "-90vh" },
                { x: 0, y: 0, scrub: true, scrollTrigger: { trigger: ".itemsinner", start: "top 70%", end: "top 10%", scrub: true } }
            );
        });

        mm.add("(max-width: 1441px)", () => {
            gsap.fromTo(".item-left",
                { x: "33vw", y: "-90vh" },
                { x: 0, y: 0, scrub: true, scrollTrigger: { trigger: ".itemsinner", start: "top 70%", end: "top 5%", scrub: true } }
            );
        });

        return () => mm.revert();
    }, []);
    // process區 ---------------------------------------
    const processRef = useRef(null);
    useEffect(() => {
        if (!processRef.current) return;

        const processEl = processRef.current;
        const items = processEl.querySelectorAll(".process-img-item");

        // 設定 zIndex
        items.forEach((item, index) => {
            item.style.zIndex = items.length - index;
        });

        // 設定初始 clipPath
        gsap.set(".process-img-item", {
            clipPath: "inset(0px 0px 0px 0px)"
        });

        // Lenis 滾動
        const lenis = new Lenis({ duration: 1.2 });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // 建立動畫
        const animation = gsap.to('.process-img-item:not(:last-child)', {
            clipPath: "inset(0px 0px 100% 0px)",
            stagger: 0.5,
            ease: "none"
        });

        // ScrollTrigger
        const sk = ScrollTrigger.create({
            trigger: processEl,
            start: "top top",
            end: "bottom bottom",
            animation: animation,
            scrub: 1,
        });

        return () => { sk.kill(); animation.kill(); gsap.ticker.remove(lenis.raf); };
    }, []);

    // notice區 ---------------------------------------
    const nplane1 = useRef(null);
    const nplane2 = useRef(null);
    const nplane3 = useRef(null);
    let requestAnimationFrameId = null;
    let nxForce = 0;
    let nyForce = 0;
    const neasing = 0.08;
    const nspeed = 0.01;
    const noticeMouseMove = (e) => {
        const { movementX, movementY } = e;
        nxForce += movementX * nspeed;
        nyForce += movementY * nspeed;

        if (requestAnimationFrameId == null) {
            requestAnimationFrameId = requestAnimationFrame(animate);
        }
    };
    const lerp = (start, target, amount) =>
        start * (1 - amount) + target * amount;
    const animate = () => {
        nxForce = lerp(nxForce, 0, neasing);
        nyForce = lerp(nyForce, 0, neasing);

        gsap.set(nplane1.current, { x: `+=${nxForce}`, y: `+=${nyForce}` });
        gsap.set(nplane2.current, {
            x: `+=${nxForce * 0.5}`,
            y: `+=${nyForce * 0.5}`
        });
        gsap.set(nplane3.current, {
            x: `+=${nxForce * 0.25}`,
            y: `+=${nyForce * 0.25}`
        });

        if (Math.abs(nxForce) < 0.01) nxForce = 0;
        if (Math.abs(nyForce) < 0.01) nyForce = 0;

        if (nxForce !== 0 || nyForce !== 0) {
            requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestAnimationFrameId);
            requestAnimationFrameId = null;
        }
    };


    // contect區 ---------------------------------------
    const formRef = useRef(null);
    const textareaRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => { // 表單複製
        const formEl = formRef.current;
        if (!formEl) return;

        const items = formEl.querySelectorAll(".contact-list");
        const lines = [];

        items.forEach((li) => {
            const label = li.querySelector(".contact-text p")?.innerText || "";
            const input = li.querySelector("input, textarea, select");
            const value = input?.value || "";
            lines.push(`${label}: ${value}`);
        });

        const textToCopy = lines.join("\n");

        // 使用隱藏 textarea 複製
        const textarea = textareaRef.current;
        textarea.value = textToCopy;
        textarea.select();
        document.execCommand("copy");
        // alert("表單已複製");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // 1.5 秒後隱藏
    };

    // 共用區 ---------------------------------------
    gsap.utils.toArray(".title").forEach(section => { //標題字動畫
        const spans = section.querySelectorAll("h3 span");
        gsap.to(spans, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,       // 每個區塊自己觸發
                start: "top 85%",
                toggleActions: "play none none none",
            }
        });
    });
    const goitemRef = useRef(null);
    const goprocessRef = useRef(null);
    const gonoticeRef = useRef(null);
    const gocontactRef = useRef(null);

    // nav跳轉
    const scrollTo = (ref) => {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
    };
    // nav顯示
    const navbarRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(
            navbarRef.current,
            { opacity: 0 },
            {
                opacity: 1,     // 顯示
                scrollTrigger: {
                    trigger: ".worksinner",
                    start: "top top", // 當 hero 區塊底部到達 viewport 上方時
                    end: "+=9999",
                    toggleActions: "play reverse play reverse",
                },
            }
        );
    }, []);

    // 彈窗
    const [isOpen, setIsOpen] = useState(false);
    const openBtnRef = useRef(null); // 開啟按鈕的 ref
    const closeBtnRef = useRef(null); // 關閉按鈕的 ref
    const openPopup = () => {
        setIsOpen(true);
        setTimeout(() => {
            closeBtnRef.current?.focus(); // 聚焦到關閉按鈕
        }, 0);
    };
    const closePopup = () => {
        setIsOpen(false);
        setTimeout(() => {
            openBtnRef.current?.focus(); // 聚焦回開啟按鈕
        }, 0);
    };

    // 禁右鍵
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);



    return (
        <>
            {/* 封面 */}
            <div className="hero">
                <div className="hero-text">
                    <div className="letters">
                        <div>c</div>
                        <div>o</div>
                        <div>m</div>
                        <div>m</div>
                        <div>i</div>
                    </div>
                    <div className="letters">
                        <div>s</div>
                        <div>s</div>
                        <div>i</div>
                        <div>o</div>
                        <div>n</div>
                    </div>
                </div>
                <div className="hero-bg">
                    <div ref={herocontentRef} className="hero-content">
                        <div className="hero-img" ref={heroimgRef}>
                            <img ref={himgRef} src={home1} alt="homepic" draggable="false" />
                        </div>
                    </div>
                </div>
            </div>

            {/* menu */}
            <header className="navbar" ref={navbarRef}>
                <button className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul className="menu">
                    <li ><a onClick={(e) => { e.preventDefault(); scrollTo(wrapperRef); }}>WORKS</a></li>
                    <li ><a onClick={(e) => { e.preventDefault(); scrollTo(goitemRef); }}>ITEMS</a></li>
                    <li ><a onClick={(e) => { e.preventDefault(); scrollTo(processRef); }}>PROCESS</a></li>
                    <li ><a onClick={(e) => { e.preventDefault(); scrollTo(gonoticeRef); }}>NOTICE</a></li>
                    <li ><a onClick={(e) => { e.preventDefault(); scrollTo(gocontactRef); }}>CONTACT</a></li>
                </ul>
            </header>

            <main>
                {/* works */}
                <div className="worksinner" ref={wrapperRef}>
                    <div className="works-images" ref={worksimgRef}>
                        {worksimgs.map((item, i) => (
                            <img key={i} src={item} className="wimage" alt={`img-${i}`} draggable="false" />
                        ))}
                    </div>
                </div>

                <div className="space">
                    <img className="ani1" src={ani01} alt="gif" />
                    <div className="space-one">
                        <img className="ani2" src={ani02} alt="gif" />
                        <img className="sp1" src={space01} alt="character" draggable="false" />
                    </div>
                    <div className="space-two">
                        <img className="ani3" src={ani02} alt="gif" />
                        <img className="sp2" src={space02} alt="character" draggable="false" />
                    </div>
                </div>

                {/* item */}
                <div className="itemsinner" ref={goitemRef}>
                    <div className="title" >
                        <h3><span>I</span><span>T</span><span>E</span><span>M</span><span>S</span></h3></div>
                    <div className="itemwrapper">
                        {/* 左邊固定圖片 */}
                        <div className="item-left">
                            <div className="img-wrapper">
                                <img ref={bgImgRef} src={displayImg} alt="background" className="img-layer bg-img" />
                                {/* 前景圖片 - 用於剪裁動畫 */}
                                <img ref={imgRef} src={displayImg} alt="preview" className="img-layer front-img" />
                            </div>
                        </div>

                        {/* 右邊文字列表 */}
                        <div className="item-right">
                            {itemsimgs.map((item) => (
                                <div
                                    key={item.id}
                                    className="item-wrap"
                                    /* onMouseEnter={() => {
                                         if (!renderedItem) setDisplayImg(item.Imgline); // hover 顯示 Imgline，但只有在沒點開時
                                     }}
                                     onClick={() => toggleItem(item.id, item.ImgSrc)}*/
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => toggleItem(item.id, item.ImgSrc)}
                                >
                                    <div className="item-title">
                                        <p data-hover={item.title}>{item.title}</p>
                                        <div className="line">
                                            <span className="bar"></span>
                                            <span className="bar"></span>
                                            <span className="bar"></span>
                                        </div>
                                    </div>

                                    <div
                                        className="item-content"
                                        ref={(el) => (contentRefs.current[item.id] = el)} >
                                        <div className="item-contentwrap">
                                            <div className="item-desc">
                                                <p>{item.desc}</p>
                                            </div>
                                            <div className="item-price">
                                                <p>{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* process */}
                <div className="processinner" ref={goprocessRef}>
                    <div className="title" >
                        <h3><span>P</span><span>R</span><span>O</span><span>C</span>
                            <span>E</span><span>S</span><span>S</span></h3></div>
                    <div className="process-wrap" ref={processRef}>
                        <div className="process-left">
                            <div className="process-text">
                                <div className="process-info">
                                    <h2>01. 討論</h2>
                                    <ul>
                                        <li>修改請一次性羅列清楚，紅線ok</li>
                                        <li>個人作畫習慣顏色皆會有偏差</li>
                                        <li>可以許願，有不想出現的構圖(不要側臉)需事先告知</li>
                                    </ul>
                                    <h2>02. 構圖▶</h2>
                                    <ul>
                                        <li>可修改1次</li>
                                        <li>確認大致位置分布(簡易十字臉)</li>
                                    </ul>
                                </div>
                                <div className="process-info">
                                    <h2>03. 草稿▶</h2>
                                    <ul>
                                        <li>可修改2次</li>
                                        <li>確認大致氛圍舖色和人物</li>
                                    </ul>
                                </div>
                                <div className="process-info">
                                    <h2>04. 完稿確認▶</h2>
                                    <ul>
                                        <li>可修改2次</li>
                                        <li>不提供構圖大改</li>
                                        <li>有少畫/設定錯/小部分修改ok</li>
                                    </ul>
                                    <h2>05. 交付</h2>
                                    <ul>
                                        <li>需要修改皆可提，評估後在負擔範圍內不會要求加價</li>
                                        <li>提供PNG檔</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="process-right">
                            <div className="process-right-b1">
                                <div className="process-img">
                                    <div className="process-img-item"><img src={process1} alt="p-構圖" draggable="false" /></div>
                                    <div className="process-img-item"><img src={process2} alt="p-草稿" draggable="false" /></div>
                                    <div className="process-img-item"><img src={home1} alt="p-完稿" draggable="false" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* notice */}
                <div className="noticeinner" ref={gonoticeRef}>
                    <div onMouseMove={noticeMouseMove} className="notice-wrap">
                        <div ref={nplane1} className="notice-plane">
                            <img src={notice7} alt="n-pic" draggable="false" />
                            <img src={notice8} alt="n-pic" draggable="false" />
                        </div>
                        <div ref={nplane2} className="notice-plane">
                            <img src={notice10} alt="n-pic" draggable="false" />
                            <img src={notice5} alt="n-pic" draggable="false" />
                            <img src={notice3} alt="n-pic" draggable="false" />
                        </div>
                        <div ref={nplane3} className="notice-plane">
                            <img src={notice1} alt="n-pic" draggable="false" />
                            <img src={notice2} alt="n-pic" draggable="false" />
                            <img src={notice6} alt="n-pic" draggable="false" />
                            <img src={notice11} alt="n-pic" draggable="false" />
                        </div>
                        <div className="notice-text">
                            <div className="title" >
                                <h3><span>N</span><span>O</span><span>T</span>
                                    <span>I</span><span>C</span><span>E</span></h3>
                            </div>
                            <div className="n-directions">
                                <ul>
                                    <li>不接：官方禁止委託之作品、古風、真人</li>
                                    {/* <li>如需標註 mili/咪哩 都可以</li> */}
                                    <li>超過付款期限(3日)視同取消委託</li>
                                    <li>工期約為確認匯款後2個月(依實際告知為準)</li>
                                    <li>有修改需求可能會依複雜度延後交稿日期(會事先告知)</li>
                                    <li>交稿日期有變更會事先告知，甲方不同意將會全額退費</li>
                                    <li>未提前告知延期的逾期行為將會全額退費</li>
                                    <li>預計完稿日未包含完稿後確認修改時間</li>
                                    <li>作品會上水印公開，禁止AI商用</li>
                                    <li>圖可依排版需求裁切、少量印製贈送收藏，返圖非常感謝🙆</li>
                                    {/* <li>金額大於3000可先匯訂金1000</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* contact */}
                <div className="contactinner" ref={gocontactRef}>
                    <div className="contact-wrap">
                        <div className="contact-desc">
                            <div className="title" >
                                <h3><span>C</span><span>O</span><span>N</span>
                                    <span>T</span><span>A</span><span>C</span><span>T</span></h3>
                            </div>
                            <ul>
                                <li>依需求評估報價，都確認沒問題後才會進行排單</li>
                                <li>報價後不進行委託可以直接說沒問題👌</li>
                                <li>比較常在半夜回覆，有不想被打擾的可事先告知</li>
                                <li>排單順序以提供完整委託資料時間為準</li>
                                <li>個人因素報價所需時間較長(非常不好意思🙇)</li>
                            </ul>
                        </div>
                        <form className="contact-form" ref={formRef}>
                            <ul className="contact-lists">
                                <li className="contact-list">
                                    <div className="contact-text"><p>稱呼</p></div>
                                    <div className="contact-inputs">
                                        <input type="text" size={40} />
                                    </div>
                                </li>
                                <li className="contact-list">
                                    <div className="contact-text"><p>聯絡方式</p></div>
                                    <div className="contact-inputs">
                                        <input type="text" size={40} />
                                    </div>
                                </li>
                                <li className="contact-list">
                                    <div className="contact-text"><p>項目</p></div>
                                    <div className="contact-inputs">
                                        {/* <input type="text" size={40} /> */}
                                        <select>
                                            <option value="雙人插圖">雙人插圖</option>
                                            <option value="全身插圖">全身插圖</option>
                                            <option value="黑白頁漫">黑白頁漫</option>
                                            <option value="滿版插圖">滿版插圖</option>
                                            <option value="">自提議</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="contact-list">
                                    <div className="contact-text"><p>是否為驚喜包</p></div>
                                    <div className="contact-inputs">
                                        <input type="text" size={40} placeholder="Y/N" />
                                    </div>
                                </li>
                                {/* <li className="contact-list">
                                    <div className="contact-text"><p>人物設定</p></div>
                                    <div className="contact-inputs">
                                        <input type="text" size={40} />
                                    </div>
                                </li>
                                <li className="contact-list">
                                    <div className="contact-text"><p>服裝設定</p></div>
                                    <div className="contact-inputs">
                                        <input type="text" size={40} />
                                    </div>
                                </li> */}
                                <li className="contact-list">
                                    <div className="contact-text"><p>其他詳細需求</p></div>
                                    <div className="contact-inputs">
                                        <textarea type="text" rows={10} cols={33} placeholder="人物/服裝設定" />
                                    </div>
                                </li>
                            </ul>
                        </form>
                        <button className="c-copy" onClick={handleCopy}>CLICK TO COPY</button>
                        {copied && (
                            <span className="copy-txt">已複製</span>
                        )}
                        <div className="connection">
                            <button><a ><p data-hover="MORE WORKS">MORE WORKS</p></a></button>
                            <button
                                ref={openBtnRef}
                                onClick={openPopup}
                                aria-controls="myPopup"
                                aria-label="Open popup"
                            ><a><p data-hover="SCHEDULE">SCHEDULE</p></a></button>
                        </div>
                        {isOpen && (
                            <div className="popup"
                                aria-hidden={!isOpen}
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) closePopup(); // 點背景關閉
                                }} >
                                <div className="wrapper" aria-labelledby="popupTitle" aria-describedby="popupText" aria-modal="true" >

                                    <button className="closePopup" ref={closeBtnRef} onClick={closePopup}>
                                        <span className="bar"></span>
                                    </button>
                                    <div>
                                        <h3>SCHEDULE</h3>
                                    </div>
                                    <div className="s-tablewrap">
                                        <div class="s-table">
                                            <div className="t-header">
                                                <div className="t-item">NAME</div>
                                                <div className="">︙</div>
                                                <div className="t-item">ITEM</div>
                                                <div className="">︙</div>
                                                <div className="t-item">★</div>
                                                <div className="">︙</div>
                                                <div className="t-item">DEADLINE</div>
                                                <div className="">︙</div>
                                                <div className="t-item">LINK</div>
                                                <div className="">︙</div>
                                                <div className="t-item">已付款</div>
                                            </div>
                                            <div className="t-list">
                                                <div className="t-item">測試</div>
                                                <div className="">︙</div>
                                                <div className="t-item">測試</div>
                                                <div className="">︙</div>
                                                <div className="t-item">測試</div>
                                                <div className="">︙</div>
                                                <div className="t-item"><span>30-10-25</span></div>
                                                <div className="">︙</div>
                                                <div className="t-item">■</div>
                                                <div className="">︙</div>
                                                <div className="t-item"><span>✓</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="s-up">
                                        <p>更新時間: 25-09-24</p>
                                    </div>

                                </div>
                            </div>
                        )}
                        <div><img src={space03} alt="character" draggable="false" /></div>
                        {/* 隱藏 textarea 用於複製 */}
                        <textarea ref={textareaRef} style={{ position: "absolute", left: "-9999px" }} />
                    </div>
                </div>
            </main>
            <div className="outlink">
                <a href="" class="link link--alt">
                    <svg viewBox='0 0 200 200' width='200' height='200' xmlns='http://www.w3.org/2000/svg' class="link__svg" aria-labelledby="link2-title link2-desc">
                        <title id="link2-title">Click here to contact</title>
                        {/* <desc id="link2-desc">A rotating link with text placed around a circle, with a cloud/flower shape around it, and a smiley face inside</desc> */}

                        <path id="link-circle-alt" class="link__path" d="M 35, 100 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0" stroke="none" fill="none" />

                        <path class="link__cloud" d="M88.964,9.111C89.997,4.612 94.586,0.999 100,0.999C105.413,0.999 110.002,4.612 111.036,9.111C113.115,4.991 118.435,2.581 123.692,3.878C128.948,5.172 132.54,9.78 132.466,14.393C135.472,10.891 141.214,9.824 146.008,12.341C150.801,14.855 153.185,20.189 152.01,24.651C155.766,21.968 161.597,22.307 165.648,25.899C169.7,29.488 170.741,35.235 168.53,39.286C172.818,37.583 178.4,39.307 181.474,43.761C184.551,48.217 184.183,54.047 181.068,57.451C185.641,56.823 190.646,59.834 192.567,64.894C194.486,69.955 192.735,75.529 188.895,78.09C193.486,78.573 197.626,82.693 198.278,88.067C198.93,93.441 195.898,98.433 191.556,100C195.898,101.567 198.93,106.56 198.278,111.934C197.626,117.307 193.486,121.427 188.895,121.91C192.735,124.472 194.486,130.045 192.567,135.106C190.646,140.167 185.641,143.177 181.068,142.549C184.183,145.954 184.551,151.783 181.474,156.239C178.4,160.693 172.818,162.418 168.53,160.712C170.741,164.766 169.7,170.512 165.648,174.102C161.597,177.691 155.766,178.032 152.01,175.349C153.185,179.812 150.801,185.145 146.008,187.66C141.214,190.176 135.472,189.109 132.466,185.607C132.54,190.221 128.948,194.828 123.692,196.123C118.435,197.419 113.115,195.009 111.036,190.889C110.002,195.388 105.413,199.001 100,199.001C94.586,199.001 89.997,195.388 88.964,190.889C86.884,195.009 81.564,197.419 76.307,196.123C71.051,194.828 67.461,190.221 67.533,185.607C64.529,189.109 58.785,190.176 53.992,187.66C49.2,185.145 46.815,179.812 47.989,175.349C44.233,178.032 38.402,177.691 34.351,174.102C30.299,170.512 29.259,164.766 31.469,160.712C27.181,162.418 21.599,160.693 18.525,156.239C15.449,151.783 15.816,145.954 18.931,142.549C14.359,143.177 9.353,140.167 7.434,135.106C5.513,130.045 7.264,124.472 11.104,121.91C6.514,121.427 2.374,117.307 1.722,111.934C1.07,106.56 4.103,101.567 8.443,100C4.103,98.433 1.07,93.441 1.722,88.067C2.374,82.693 6.514,78.573 11.104,78.09C7.264,75.529 5.513,69.955 7.434,64.894C9.353,59.834 14.359,56.823 18.931,57.451C15.816,54.047 15.449,48.217 18.525,43.761C21.599,39.307 27.181,37.583 31.469,39.286C29.259,35.235 30.299,29.488 34.351,25.899C38.402,22.307 44.233,21.968 47.989,24.651C46.815,20.189 49.2,14.855 53.992,12.341C58.785,9.824 64.529,10.891 67.533,14.393C67.461,9.78 71.051,5.172 76.307,3.878C81.564,2.581 86.884,4.991 88.964,9.111Z" fill="none" />

                        <g class="link__face">
                            <path d='M 95 102 Q 100 107 105 102' fill="none" />
                            <ellipse class='' cx='90' cy='100' rx='2' ry='2' stroke="none" />
                            <ellipse class='' cx='110' cy='100' rx='2' ry='2' stroke="none" />
                            <ellipse class='' cx='100' cy='100' rx='35' ry='35' fill="none" />
                        </g>

                        <text class="link__text">
                            <textPath href="#link-circle-alt" stroke="none">
                                •　Click　here　to　contact　•　Thank
                            </textPath>
                        </text>
                    </svg>
                </a>
            </div>

            <footer><p>2025. © all rights reserved.</p></footer>

        </>
    );
}

export default Home