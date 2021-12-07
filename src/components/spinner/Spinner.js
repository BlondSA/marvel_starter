const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                margin: "auto",
                background: "#9F0013",
                display: "block",
                shapeRendering: "auto",
            }}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                r="28"
                strokeWidth="7"
                stroke="#ffffff"
                strokeDasharray="43.982297150257104 43.982297150257104"
                fill="none"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default Spinner;
