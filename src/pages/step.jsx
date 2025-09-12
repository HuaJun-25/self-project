import React from 'react'

const step = () => {
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
    return (
        <>
            <div className="itemsinner">
                <div className="item-title" >
                    <h3 ref={titleRef}><span>I</span>TEM</h3></div>
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
        </>
    )
}

export default step