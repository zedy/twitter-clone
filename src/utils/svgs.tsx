export const Calendar = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
  <svg height="${w}px" width="${h}px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 512 512" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#${color};}
  </style>
  <g>
    <path class="st0" d="M186.469,408.911c32.102,0,56.032-21.571,56.032-54.189c0-23.421-13.152-38.94-23.668-43.411v-0.525
      c13.152-8.68,19.983-22.102,19.983-37.097c0-28.941-19.197-49.455-52.609-49.455c-28.941,0-48.676,16.575-52.624,38.146
      c-0.262,1.572,0.524,2.891,2.112,3.153l22.357,5.266c1.588,0.262,2.637-0.262,3.161-1.842
      c3.161-11.048,10.793-18.418,23.945-18.418c14.987,0,23.93,9.999,23.93,24.207c0,15.781-10.253,26.042-26.042,26.042h-7.108
      c-1.573,0-2.621,1.049-2.621,2.63v20.784c0,1.581,1.048,2.629,2.621,2.629h7.632c17.624,0,29.203,11.055,29.203,29.203
      c0,15.264-9.729,26.574-26.304,26.574c-14.74,0-23.421-8.419-27.106-18.942c-0.524-1.58-1.834-2.104-3.145-1.842l-22.897,5.266
      c-1.572,0.524-2.359,1.834-2.096,3.415C136.744,394.972,158.577,408.911,186.469,408.911z"/>
    <path class="st0" d="M296.713,281.583l27.352-19.204h0.524v141.011c0,1.58,1.064,2.629,2.637,2.629h24.207
      c1.572,0,2.621-1.048,2.621-2.629V229.754c0-1.572-1.048-2.629-2.621-2.629h-22.373c-2.097,0-3.407,0.524-4.733,1.58
      l-28.664,20.784c-1.326,1.048-1.85,2.104-1.85,3.677v26.836C293.814,282.108,295.125,282.632,296.713,281.583z"/>
    <path class="st0" d="M118.612,89.297c9.482,0,17.176-7.686,17.176-17.169v-54.96C135.788,7.686,128.094,0,118.612,0
      c-9.483,0-17.177,7.686-17.177,17.169v54.96C101.435,81.611,109.129,89.297,118.612,89.297z"/>
    <path class="st0" d="M255.993,89.297c9.482,0,17.176-7.686,17.176-17.169v-54.96C273.168,7.686,265.475,0,255.993,0
      c-9.483,0-17.17,7.686-17.17,17.169v54.96C238.823,81.611,246.51,89.297,255.993,89.297z"/>
    <path class="st0" d="M427.001,44.899h-2.714v27.229c0,17.038-13.861,30.906-30.914,30.906c-17.038,0-30.914-13.869-30.914-30.906
      V44.899h-75.552v27.229c0,17.038-13.869,30.906-30.914,30.906c-17.038,0-30.907-13.869-30.907-30.906V44.899h-75.56v27.229
      c0,17.038-13.869,30.906-30.914,30.906c-17.038,0-30.914-13.869-30.914-30.906V44.899h-2.698
      c-37.074,0-67.133,30.058-67.133,67.133v332.835c0,37.074,30.058,67.133,67.133,67.133h342.002
      c37.066,0,67.133-30.058,67.133-67.133V112.032C494.134,74.958,464.067,44.899,427.001,44.899z M466.642,439.771
      c0,24.716-20.029,44.753-44.744,44.753H90.103c-24.716,0-44.76-20.037-44.76-44.753V127.328h421.299V439.771z"/>
    <path class="st0" d="M393.373,89.297c9.483,0,17.176-7.686,17.176-17.169v-54.96C410.549,7.686,402.855,0,393.373,0
      c-9.483,0-17.177,7.686-17.177,17.169v54.96C376.196,81.611,383.89,89.297,393.373,89.297z"/>
  </g>
  </svg>
  `}}></div>
);

export const Location = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="${w}px" height="${h}px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 10.5C6.5 7 9 4.5 12.5 4.5C16 4.5 18.5 7 18.5 10.5C18.5 14 15.5 17.5 12.5 20.5C9.5 17.5 6.5 14 6.5 10.5Z" stroke="#${color}" stroke-width="1.2"/>
    <path d="M14 10.5C14 11.3284 13.3284 12 12.5 12C11.6716 12 11 11.3284 11 10.5C11 9.67157 11.6716 9 12.5 9C13.3284 9 14 9.67157 14 10.5Z" stroke="#${color}" stroke-width="1.2"/>
    </svg>
  `}}></div>
);

export const ArrowLeft = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="${w}px" height="${h}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `}}></div>
);

export const Cross = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="${w}px" height="${h}px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#${color}"/>
    </svg>
  `}}></div>
);

export const Twitter = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="${w}px" height="${h}px" viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>Twitter-color</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#${color}">
            <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter">

</path>
        </g>
    </g>
</svg>
    `
  }}>
  </div>
);

export const VerifiedBadge = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <svg width="${w}px" height="${h}px" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg">
    <path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#${color}"/>
    </svg>
  `}}></div>
);

export const VerifiedBadgeOutline = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="${w}px" height="${h}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z" stroke="#${color}" stroke-width="1.5"/>
  <path d="M9 12L11 14L15 10" stroke="#${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `}}></div>
);

export const Home = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 1024 1024" fill="#${color}" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M972 520.8c-6.4 0-12-2.4-16.8-7.2L530.4 86.4c-4.8-4.8-11.2-8-18.4-8-6.4 0-12.8 2.4-18.4 8L68.8 512c-4.8 4.8-10.4 7.2-16.8 7.2s-12-2.4-16-6.4c-4.8-4-7.2-8.8-7.2-15.2-0.8-7.2 2.4-14.4 7.2-19.2L458.4 52.8c14.4-14.4 32.8-22.4 52.8-22.4s38.4 8 52.8 22.4L988.8 480c4.8 4.8 7.2 11.2 7.2 18.4 0 7.2-4 13.6-8.8 17.6-4.8 3.2-10.4 4.8-15.2 4.8z" fill="" /><path d="M637.6 998.4v-33.6h-33.6V904c0-51.2-41.6-92-92-92-51.2 0-92 41.6-92 92v60.8h-33.6v33.6H196.8c-40.8 0-73.6-32.8-73.6-73.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 14.4 11.2 25.6 25.6 25.6h175.2v-45.6c0-77.6 63.2-140 140-140s140 63.2 140 140v45.6h175.2c14.4 0 25.6-11.2 25.6-25.6V509.6c0-13.6 10.4-24 24-24s24 10.4 24 24v415.2c0 40.8-32.8 73.6-73.6 73.6H637.6z" fill="" /><path d="M604 998.4v-48h48v48h-48z m-232 0v-48h48v48h-48z" fill="" /></svg>
  `}}></div>
);

export const Bell = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 1024 1024" fill="#${color}" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M538.4 1017.6h-6.4c-80-4-112.8-72-118.4-107.2-2.4-14.4 7.2-28 21.6-29.6h4.8c12.8 0 23.2 8.8 25.6 21.6 0.8 6.4 12.8 60.8 69.6 64h4.8c53.6 0 66.4-61.6 66.4-64.8 2.4-12 12.8-20.8 25.6-20.8 1.6 0 3.2 0 5.6 0.8 6.4 1.6 12.8 5.6 16.8 11.2s5.6 12.8 4 19.2c-8.8 36-43.2 105.6-120 105.6z m-453.6-144c-24 0-43.2-7.2-55.2-20.8-10.4-12-13.6-28-12.8-38.4V784c-3.2-18.4 4-61.6 84-136 78.4-72.8 127.2-271.2 127.2-413.6C228.8 69.6 461.6 48.8 471.2 48h4.8V28C476 16 485.6 6.4 497.6 6.4h21.6c12 0 21.6 9.6 21.6 21.6V48h9.6c10.4 0.8 244.8 20 244.8 185.6 0 140.8 52.8 340.8 132 413.6 80 74.4 80 115.2 79.2 138.4v27.2c0.8 14.4-0.8 28-8.8 38.4-11.2 14.4-28.8 22.4-53.6 22.4H84.8z m-15.2-55.2c0.8 0.8 5.6 3.2 15.2 3.2h868.8l1.6-44.8v-2.4c0-5.6-4.8-32.8-64-87.2-92-86.4-148.8-302.4-148.8-452.8 0-115.2-192.8-133.6-194.4-133.6h-74.4c-20 2.4-192.8 23.2-192.8 133.6 0 132-44.8 360-143.2 452-60.8 56-67.2 84.8-68 90.4l0.8 1.6-0.8 40z" fill="" /></svg>
  `}}></div>
);

export const Profile = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 1024 1024" fill="#${color}" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M309.52 494.12c-1.94 0-3.47 0.28-4.67 0.76 1.63-0.49 3.37-0.76 5.16-0.76h-0.49z m535.61 213.4c0.05-0.99 0.18-1.96 0.39-2.9-0.23 0.43-0.35 1.35-0.39 2.9z m35.73-394.23c0.01-0.04 0.01-0.09 0.01-0.13v-0.46c0 0.2 0 0.4-0.01 0.59z m-35.75-0.06c0 0.04 0 0.08 0.01 0.12-0.01-0.21-0.01-0.43-0.01-0.65v0.53z m21.563 536.2a348 348 0 0 0-32.69-107.48c-3.26-6.62-6.71-13.13-10.37-19.51a0.21 0.21 0 0 0-0.04-0.06c-15.86-26.86-35.32-51.8-58-74.06l-0.01-0.01c-4.93-4.84-10.01-9.56-15.24-14.14-37.29-32.68-80.34-56.91-126.25-71.65 8.31-4.6 16.35-9.76 24.07-15.47 8.79-6.48 17.16-13.68 25.03-21.55 41.39-41.39 64.19-96.43 64.19-154.97 0-58.54-22.8-113.58-64.19-154.97-40.64-40.64-94.44-63.35-151.78-64.17-0.91-0.01-1.82-0.02-2.73-0.02-0.91 0-1.82 0.01-2.73 0.02-57.34 0.82-111.14 23.53-151.78 64.17-41.39 41.39-64.19 96.43-64.19 154.97 0 58.54 22.8 113.58 64.19 154.97 7.87 7.87 16.24 15.07 25.03 21.55 7.72 5.71 15.76 10.87 24.07 15.47-45.91 14.74-88.96 38.97-126.25 71.65-5.23 4.58-10.31 9.3-15.24 14.14-22.7 22.28-42.18 47.24-58.05 74.13-3.66 6.38-7.11 12.89-10.37 19.51a348 348 0 0 0-32.69 107.48c-1.61 12 6.81 23.03 18.8 24.64 0.99 0.13 1.98 0.2 2.95 0.2 0.89 0 1.76-0.05 2.63-0.16 8.67-1.89 15.67-8.96 17.03-18.25 10.1-69.32 43.14-132.31 90.63-180.28 56.36-56.95 133.07-92.74 215.97-92.88h0.47c82.72 0.28 159.25 36.04 215.5 92.88 47.49 47.97 80.53 110.96 90.63 180.28 1.36 9.27 8.33 16.33 16.98 18.24 0.02 0 0.03 0.01 0.05 0.01 0.87 0.11 1.74 0.16 2.63 0.16 0.97 0 1.96-0.07 2.95-0.2 11.99-1.61 20.41-12.64 18.8-24.64z m-348.48-303.57c-0.44 0-0.88 0-1.32-0.01-81.8-0.6-154.73-57.43-174.66-133.66-0.22-0.83-0.44-1.67-0.64-2.51-3.12-12.6-4.78-25.7-4.78-39.15s1.66-26.7 4.78-39.52c0.2-0.86 0.42-1.71 0.64-2.56 20.04-78.14 93.65-140.25 175.98-140.25h0.94c82.33 0 155.94 62.11 175.98 140.25 0.22 0.85 0.44 1.7 0.64 2.56 3.12 12.82 4.78 26.07 4.78 39.52 0 13.45-1.66 26.55-4.78 39.15-0.2 0.84-0.42 1.68-0.64 2.51-19.93 76.23-92.86 133.06-174.66 133.66-0.75 0.01-1.5 0.01-2.26 0.01z" fill="" /></svg>
  `}}></div>
);

export const TwitterOutline = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9999 5.9246C21.2644 6.25051 20.4744 6.47071 19.6437 6.57025C20.4911 6.06289 21.1411 5.25782 21.4477 4.29948C20.6549 4.76984 19.7767 5.1116 18.8422 5.29481C18.0935 4.49855 17.0277 4 15.8474 4C13.5819 4 11.7445 5.8374 11.7445 8.10464C11.7445 8.42526 11.7815 8.73707 11.8502 9.03832C8.43877 8.86656 5.41666 7.23263 3.39252 4.75046C3.04019 5.35823 2.8376 6.06289 2.8376 6.81335C2.8376 8.23677 3.56252 9.4937 4.66267 10.2292C3.98972 10.2072 3.35729 10.0231 2.80413 9.71567V9.76852C2.80413 11.7565 4.21786 13.4151 6.09577 13.7921C5.75049 13.8855 5.38847 13.9348 5.015 13.9348C4.75075 13.9348 4.49267 13.9102 4.24252 13.8626C4.76485 15.4921 6.27987 16.6795 8.07587 16.7112C6.67095 17.8122 4.90137 18.4684 2.97942 18.4684C2.64823 18.4684 2.32144 18.449 1.99994 18.4112C3.8162 19.5765 5.97246 20.2547 8.28903 20.2547C15.8377 20.2547 19.9644 14.0026 19.9644 8.58029C19.9644 8.40412 19.9599 8.2262 19.952 8.05003C20.7536 7.47045 21.4494 6.74905 21.9982 5.92724L21.9999 5.9246Z" stroke="#${color}" stroke-linejoin="round"/>
    </svg>
  `}}></div>
);

export const Like = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="${w}px" height="${h}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096 19.7499 12.6739 19.6292 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.7639 3.68739 14.5983 3.88249 12.5404 6.02065C12.399 6.16754 12.2039 6.25054 12 6.25054C11.7961 6.25054 11.601 6.16754 11.4596 6.02065C9.40166 3.88249 7.23607 3.68739 5.62436 4.4241ZM12 4.45873C9.68795 2.39015 7.09896 2.10078 5.00076 3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25 11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888 6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378 19.292 8.49742 19.4998C9.00965 19.9036 9.55954 20.3342 10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904 21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342 14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434 19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888 20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75 6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121 2.39015 12 4.45873Z" fill="#${color}"/>
    </svg>
  `}}></div>
);

export const Comment = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#${color};stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H7.23v2.86L13,18.66h5.73a3.82,3.82,0,0,0,3.82-3.82V5.3a3.82,3.82,0,0,0-3.82-3.82H5.32A3.82,3.82,0,0,0,1.5,5.3Z"/></svg>
  `}}></div>
);

export const Retweet = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd" stroke="#${color}" stroke-linecap="round" stroke-linejoin="round" transform="translate(1 4)">
    <path d="m12.5 9.5 3 3 3-3"/>
    <path d="m8.5.5h3c2.209139 0 4 1.790861 4 4v8"/>
    <path d="m6.5 3.5-3-3-3 3"/>
    <path d="m10.5 12.5h-3c-2.209139 0-4-1.790861-4-4v-8"/>
    </g>
    </svg>
  `}}></div>
);

export const Return = (w: number, h: number, color: string) => (
  <div dangerouslySetInnerHTML={{
    __html: `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="${w}px" height="${h}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z" fill="#${color}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z" fill="#${color}"/></svg>
  `}}></div>
);