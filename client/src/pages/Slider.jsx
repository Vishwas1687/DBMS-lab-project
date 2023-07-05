// import React, { useState } from "react";

// const Sliderr = () => {
//   const [position, setPosition] = useState(0);

//   const moveSlider = (direction) => {
//     const sliderWidth = document.getElementById("slider").offsetWidth;
//     const containerWidth = document.getElementById("container").offsetWidth;
//     const maxPosition = containerWidth - sliderWidth;

//     let newPosition = position + direction * 100;
//     if (newPosition < 0) newPosition = 0;
//     if (newPosition > maxPosition) newPosition = maxPosition;

//     setPosition(newPosition);
//   };

//   return (
//     <div className="slider-container">
//       <div className="arrow left" onClick={() => moveSlider(-1)}>
//         &lt;
//       </div>
//       <div id="container" className="slider">
//         <div
//           id="slider"
//           className="slider-inner"
//           style={{ transform: `translateX(-${position}px)` }}
//         >
//           {/* Add your image slides here */}
//           <div className="slide">
//             <img src="image1.jpg" alt="Slide 1" />
//           </div>
//           <div className="slide">
//             <img src="image2.jpg" alt="Slide 2" />
//           </div>
//           <div className="slide">
//             <img src="image3.jpg" alt="Slide 3" />
//           </div>
//           {/* ... */}
//         </div>
//       </div>
//       <div className="arrow right" onClick={() => moveSlider(1)}>
//         &gt;
//       </div>
//     </div>
//   );
// };

// export default Sliderr;
