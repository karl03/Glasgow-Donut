export default function Tooltip({visible, title, text, x, y}){
    return (<div style={{
        display: visible ? "block" : "none",
        position: "fixed",
        top: y + "px",
        left: x + "px",
        pointerEvents: "none"
    }}>
        <p style={{
            maxWidth: "200px",
            maxHeight: "100px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            display: "inline-block",
            margin: "0",
            padding: "2px",
            backgroundColor: "white"
        }}>
            <b>{title}</b>
            <br />
            {text}
        </p>
    </div>);
};