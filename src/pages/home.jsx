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
import item2 from '../images/20.png';
import item3 from '../images/25.png';
import item4 from '../images/item04.avif';
import item1a from '../images/01-2.jpg';
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
        desc: "- 半身人物占比為主",
        Imgline: item1a,
    },
    {
        id: 2,
        ImgSrc: item2,
        title: "全身插圖",
        desc: "- 含簡單裝飾背景",
        Imgline: item2a,
    },
    {
        id: 3,
        ImgSrc: item3,
        title: "黑白頁漫",
        desc: "- 限委託過",
        Imgline: item3a,
    },
    {
        id: 4,
        ImgSrc: item4,
        title: "滿版插圖",
        desc: "Description1",
        Imgline: item4a,
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
    const [displayImg, setDisplayImg] = useState(itemsimgs[0]?.Imgline || "");
    const [renderedItem, setRenderedItem] = useState(null); // 目前展開的 item
    const contentRefs = useRef({});
    const imgRef = useRef(null); // 左邊圖片的 ref

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
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onStart: () => setDisplayImg(imgSrc),
                }
            );
        }
    };

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

    const handleCopy = () => { // 表單複製
        const formEl = formRef.current;
        if (!formEl) return;

        const items = formEl.querySelectorAll(".contact-list");
        const lines = [];

        items.forEach((li) => {
            const label = li.querySelector(".contact-text p")?.innerText || "";
            const input = li.querySelector("input, textarea");
            const value = input?.value || "";
            lines.push(`${label}: ${value}`);
        });

        const textToCopy = lines.join("\n");

        // 使用隱藏 textarea 複製
        const textarea = textareaRef.current;
        textarea.value = textToCopy;
        textarea.select();
        document.execCommand("copy");
        alert("表單資料已複製到剪貼簿！");
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
                start: "top 80%",       // 區塊進入螢幕 70% 時
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
            <nav className="navbar" ref={navbarRef}>
                <button className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul className="menu">
                    <li><a onClick={(e) => { e.preventDefault(); scrollTo(wrapperRef); }}>WORKS</a></li>
                    <li><a onClick={(e) => { e.preventDefault(); scrollTo(goitemRef); }}>ITEMS</a></li>
                    <li><a onClick={(e) => { e.preventDefault(); scrollTo(processRef); }}>PROCESS</a></li>
                    <li><a onClick={(e) => { e.preventDefault(); scrollTo(gonoticeRef); }}>NOTICE</a></li>
                    <li><a onClick={(e) => { e.preventDefault(); scrollTo(gocontactRef); }}>CONTACT</a></li>
                </ul>
            </nav>

            {/* works */}
            <div className="worksinner" ref={wrapperRef}>
                <div className="works-images" ref={worksimgRef}>
                    {worksimgs.map((item, i) => (
                        <img key={i} src={item} className="wimage" alt={`img-${i}`} draggable="false" />
                    ))}
                </div>
            </div>

            {/* item */}
            <div className="itemsinner" ref={goitemRef}>
                <div className="title" >
                    <h3><span>I</span><span>T</span><span>E</span><span>M</span><span>S</span></h3></div>
                <div className="itemwrapper">
                    {/* 左邊固定圖片 */}
                    <div className="item-left">
                        <img ref={imgRef} src={displayImg} alt="preview" />
                    </div>

                    {/* 右邊文字列表 */}
                    <div className="item-right">
                        {itemsimgs.map((item) => (
                            <div
                                key={item.id}
                                className="item-wrap"
                                onMouseEnter={() => {
                                    if (!renderedItem) setDisplayImg(item.Imgline); // hover 顯示 Imgline，但只有在沒點開時
                                }}
                                onClick={() => toggleItem(item.id, item.ImgSrc)}
                            >
                                <div className="item-title">
                                    <p>{item.title}</p>
                                </div>

                                <div
                                    className="item-content"
                                    ref={(el) => (contentRefs.current[item.id] = el)}
                                    style={{ height: 0, overflow: "hidden" }}
                                >
                                    <div className="item-contentwrap">
                                        <div className="item-desc">
                                            <p>{item.desc}</p>
                                        </div>
                                        <div className="item-price">
                                            <p>{item.title}</p>
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
                                    <li>可以許願，有不想出現的構圖(側臉NG等)需事先告知</li>
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
                        <img src={notice7} alt="n-pic" />
                        <img src={notice8} alt="n-pic" />
                    </div>
                    <div ref={nplane2} className="notice-plane">
                        <img src={notice10} alt="n-pic" />
                        <img src={notice5} alt="n-pic" />
                        <img src={notice3} alt="n-pic" />
                    </div>
                    <div ref={nplane3} className="notice-plane">
                        <img src={notice1} alt="n-pic" />
                        <img src={notice2} alt="n-pic" />
                        <img src={notice6} alt="n-pic" />
                    </div>
                    <div className="notice-text">
                        <div className="title" >
                            <h3><span>N</span><span>O</span><span>T</span>
                                <span>I</span><span>C</span><span>E</span></h3>
                        </div>
                        <p>
                            - 不接：官方禁止委託之作品、古風、真人<br />
                            {/* - 如需標註 mili/咪哩 都可以<br /> */}
                            - 超過付款期限(3日)視同取消委託<br />
                            - 工期約為確認匯款後2個月(依實際告知為準)<br />
                            - 有修改需求可能會依複雜度延後交稿日期(會事先告知)<br />
                            - 交稿日期有變更會事先告知，甲方不同意將會全額退費<br />
                            - 未提前告知延期的逾期行為將會全額退費<br />
                            - 預計完稿日未包含完稿後確認修改時間<br />
                            - 作品會上水印公開，禁止AI商用<br />
                            - 圖可依排版需求裁切、少量印製贈送收藏，返圖非常感謝🙆<br />
                            {/* - 金額大於3000可先匯訂金1000<br/> */}
                        </p>
                    </div>
                </div>
            </div>

            {/* contact */}
            <div className="contactinner" ref={gocontactRef}>
                <div className="contact-wrap">
                    <div className="contact-pic">

                    </div>
                    <div className="contact-desc">
                        <div className="title" >
                            <h3><span>C</span><span>O</span><span>N</span>
                                <span>T</span><span>A</span><span>C</span><span>T</span></h3>
                        </div>
                        <p>- 依需求評估報價，都確認沒問題後才會進行排單<br />
                            {/* - 報價後不進行委託可以直接說沒問題👌<br /> */}
                            - 比較常在半夜回覆，有不想被打擾的可事先告知<br />
                            - 排單順序以提供完整委託資料時間為準<br />
                            - 個人因素報價所需時間較長(非常不好意思🙇)</p></div>
                    <form className="contact-form" ref={formRef}>
                        <ul className="contact-lists">
                            <li className="contact-list">
                                <div className="contact-text"><p>稱呼</p></div>
                                <div className="contact-inputs">
                                    <input type="text" size={40} />
                                </div>
                            </li>
                            <li className="contact-list">
                                <div className="contact-text"><p>項目</p></div>
                                <div className="contact-inputs">
                                    <input type="text" size={40} />
                                </div>
                            </li>
                            <li className="contact-list">
                                <div className="contact-text"><p>是否為驚喜包</p></div>
                                <div className="contact-inputs">
                                    <input type="text" size={40} placeholder="Y/N" />
                                </div>
                            </li>
                            <li className="contact-list">
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
                            </li>
                            <li className="contact-list">
                                <div className="contact-text"><p>其他詳細需求</p></div>
                                <div className="contact-inputs">
                                    <textarea type="text" rows={10} cols={33} />
                                </div>
                            </li>
                        </ul>
                    </form>
                    <button onClick={handleCopy}>COPY</button>

                    {/* 隱藏 textarea 用於複製 */}
                    <textarea ref={textareaRef} style={{ position: "absolute", left: "-9999px" }} />
                </div>
            </div>

            <footer><p>2025. © all rights reserved.</p></footer>

        </>
    );
}

export default Home