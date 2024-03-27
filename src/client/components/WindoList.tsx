import React, { useRef, useState, useEffect, useCallback } from "react";

const WindowedList = () => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([1, 2, 3, 4, 4]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const data = Array.from({ length: 500 }, (_, i) => i);

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const calculateVisibleItems = useCallback(() => {
    const containerElement = containerRef.current;
    const containerHeight = containerElement.offsetHeight;
    const itemHeight = containerElement.firstChild?.offsetHeight || 0;
    const scrollTop = containerElement.scrollTop;

    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const visibleItemCount = Math.ceil(containerHeight / itemHeight);

    // Calculate scroll speed and adjust buffer
    const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
    const buffer = Math.max(20, scrollSpeed / itemHeight);

    const newEndIndex = newStartIndex + visibleItemCount + buffer;

    console.log(
      { containerHeight, itemHeight, scrollTop, newStartIndex, newEndIndex },
      "container height, item height, and scroll top"
    );

    // Delay the calculation by 200ms
    setTimeout(() => {
      const newVisibleItems = data.slice(newStartIndex, newEndIndex);

      setVisibleItems(newVisibleItems);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }, 200);

    // Update last scroll position
    setLastScrollTop(scrollTop);
  }, [data, lastScrollTop]);

  useEffect(() => {
    const containerElement = containerRef.current;

    containerElement.addEventListener("scroll", calculateVisibleItems);

    return () => {
      containerElement.removeEventListener("scroll", calculateVisibleItems);
    };
  }, [calculateVisibleItems]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        height: "200px",
        width: "500px",
        backgroundColor: "white",
        marginBlock: "500px",
      }}
    >
      {visibleItems.map((item, index) => (
        <div key={index + startIndex} style={{ height: "50px" }}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default WindowedList;
