import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Lenis from "@studio-freight/lenis";
import { FaArrowRight } from "react-icons/fa6";
import '../scss/home.scss';

import home1 from '../images/process02.avif';
import item1 from '../images/item01.avif';
import item2 from '../images/item02.avif';
import item3 from '../images/item03.avif';
import item4 from '../images/item04.avif';
import process1 from '../images/process01.avif';
import process2 from '../images/process02.avif';

gsap.registerPlugin(Draggable, ScrollTrigger);

// works-照片
const worksimgs = [
    "https://images.unsplash.com/photo-1756303018960-e5279e145963?q=80&w=838&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1754079132758-5dfb65298934?q=80&w=2196&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1755804993716-a3f19e419eaf?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1756573187428-48ffc9557eb4?q=80&w=774&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1754172111686-89a5782b18c6?q=80&w=774&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1756680967556-26861e2c836b?q=80&w=774&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1756768937629-febe4bf15fcf?q=80&w=1742&auto=format&fit=crop",
];
// item-照片
const itemsimgs = [
    {
        id: 1,
        ImgSrc: item1,
        title: "雙人插圖",
        desc: "- 半身人物占比為主",
    },
    {
        id: 2,
        ImgSrc: item2,
        title: "全身插圖",
        desc: "- 含簡單裝飾背景",
    },
    {
        id: 3,
        ImgSrc: item3,
        title: "黑白頁漫",
        desc: "- 限委託過",
    },
    {
        id: 4,
        ImgSrc: item4,
        title: "滿版插圖",
        desc: "Description1",
    },
];

const Home = () => {

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
    const [itemimgs, setItemimgs] = useState([...itemsimgs]);
    const [fadeIn, setFadeIn] = useState(true);
    const itemcontainerRef = useRef(null);
    const [itemselectedIndex, setItemselectedIndex] = useState(0);
    // 淡入淡出效果
    useEffect(() => {
        setFadeIn(false); // 先重置
        const timer = setTimeout(() => setFadeIn(true), 50); // 小延遲觸發 transition
        return () => clearTimeout(timer);
    }, [itemimgs]);
    // 箭頭切換
    const sliderforward = () => {
        setItemimgs((prevArr) => {
            const newArr = [...prevArr];
            const first = newArr.shift();
            newArr.push(first);
            return newArr;
        });
        setItemselectedIndex(0); // 因為移到最前面就是新 selimg
    };
    // 圖片切換
    const moveToFront = (index) => {
        setItemimgs((prevArr) => {
            const head = prevArr.slice(0, index);
            const tail = prevArr.slice(index);
            return [...tail, ...head];
        });
        setItemselectedIndex(0); // 每次 forward 之後，第一個一定是 selimg
    };
    // 切換圖的gsap
    useEffect(() => {
        const sel = itemcontainerRef.current.querySelector(".item-selimg");
        if (sel) {
            gsap.fromTo(
                sel,
                { scale: 0.6, x: -150, y: 100 }, // 起始狀態 (像 nonsel)
                { scale: 1, x: 0, y: 0, duration: 0.8, ease: "power2.inOut" } // 目標狀態
            );
        }
    }, [itemimgs]);

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
                            <img ref={himgRef} src={home1} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* works */}
            <div className="worksinner" ref={wrapperRef}>
                <div className="works-images" ref={worksimgRef}>
                    {worksimgs.map((item, i) => (
                        <img key={i} src={item} className="wimage" alt={`img-${i}`} draggable="false" />
                    ))}
                </div>
            </div>

            {/* item */}
            <div className="itemsinner">
                <div className="item-title"><h3><span>I</span>TEM</h3></div>
                <div className='item-wrap' ref={itemcontainerRef}>
                    <div className='item-card'>
                        {itemimgs.map((item, index) => {
                            return (
                                <div key={item.id}
                                    className={(index === 0) ? `item-selimg ${fadeIn ? 'fadein' : ''}` : 'item-nonsel'} onClick={() => moveToFront(index)}>
                                    <img className='item-img' src={item.ImgSrc} draggable="false" />
                                </div>)
                        })}
                    </div>
                    {itemimgs.length > 0 && (
                        <div className='item-txt'>
                            <h3>{itemimgs[itemselectedIndex].title}</h3>
                            <p>{itemimgs[itemselectedIndex].desc}</p>
                        </div>)}
                    <FaArrowRight className='item-arrow' onClick={sliderforward} />
                </div>
            </div>

            {/* process */}
            <div className="processinner">
                <div className="process-title"><h3><span>P</span>ROCESS</h3></div>
                <div className="process-wrap" ref={processRef}>
                    <div className="process-left">
                        <div className="process-text">
                            <div className="process-info">
                                <h2>01. 討論</h2>
                                <p>- 修改請一次性羅列清楚，紅線ok<br />- 個人作畫習慣顏色皆會有偏差<br />- 可以許願，有不想出現的構圖(側臉NG等)需事先告知</p>
                                <h2>▶02. 構圖</h2>
                                <p>- 可修改1次<br />- 確認大致位置分布(簡易十字臉)</p>
                            </div>
                            <div className="process-info">
                                <h2>▶03. 草稿</h2>
                                <p>- 可修改2次<br />- 確認大致氛圍舖色和人物</p>
                            </div>
                            <div className="process-info">
                                <h2>▶04. 完稿確認</h2>
                                <p>- 可修改2次<br />- 不提供構圖大改<br />- 有少畫/設定錯/小部分修改ok</p>
                                <h2>05. 交付</h2>
                                <p>- 需要修改皆可提，評估後在負擔範圍內不會要求加價<br />- 提供PNG檔</p>
                            </div>
                        </div>
                    </div>
                    <div className="process-right">
                        <div className="process-right-b1">
                            <div className="process-img">
                                <div className="process-img-item"><img src={process1} alt="" draggable="false" /></div>
                                <div className="process-img-item"><img src={process2} alt="" draggable="false" /></div>
                                <div className="process-img-item"><img src="https://images.unsplash.com/photo-1754079132758-5dfb65298934?q=80&w=2196&auto=format&fit=crop" alt="" draggable="false" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* notice */}
            <div className="noticeinner">
                <div onMouseMove={noticeMouseMove} className="notice-wrap">
                    <div ref={nplane1} className="notice-plane">
                        <img src={item1} alt="image" />
                        <img src={item2} alt="image" />
                        <img src={item3} alt="image" />
                    </div>
                    <div ref={nplane2} className="notice-plane">
                        <img src={item4} alt="image" />
                        <img src={item3} alt="image" />
                        <img src={item2} alt="image" />
                    </div>
                    <div ref={nplane3} className="notice-plane">
                        <img src={item1} alt="image" />
                        <img src={item4} alt="image" />
                    </div>
                    <div className="notice-title">
                        <h3><span>N</span>OTICE</h3>
                        <p className="notice-text">
                            - 不接：官方禁止委託之作品、古風、真人<br/>
                            - 如需標註 mili/咪哩 都可以<br/>
                            - 超過付款期限(3日)視同取消委託<br/>
                            - 工期約為確認匯款後2個月(依實際告知為準)<br/>
                            - 有修改需求可能會依複雜度延後交稿日期(會事先告知)<br/>
                            - 交稿日期有變更會事先告知，甲方不同意將會全額退費<br/>
                            - 未提前告知延期的逾期行為將會全額退費<br/>
                            - 預計完稿日未包含完稿後確認修改時間<br/>
                            - 作品會上水印公開，禁止AI商用<br/>
                            - 圖可依頭貼或排版需求裁切、少量印製贈送收藏，返圖非常感謝🙆<br/>
                            {/* - 金額大於3000可先匯訂金1000<br/> */}
                            </p>
                    </div>
                </div>
            </div>

            {/* contact */}
            <div className="contactinner">
                <div className="contact-wrap">

                </div>

            </div>
        </>
    );
}

export default Home