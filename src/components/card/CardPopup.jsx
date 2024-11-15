const CardPopup = ({ obj }) => {
    const getRiskMessage = (ps_cum) => {
        if (ps_cum < -2) {
            return "Minimal risk. No significant concerns";
        } else if (ps_cum >= -2 && ps_cum < 0) {
            return "Low to moderate risk. Monitoring is recommended";
        } else if (ps_cum >= 0) {
            return "Elevated risk. Immediate analysis required";
        } else {
            return "Risk level unknown.";
        }
    };

    return (
        <div className="Card-Popup">
            <div className="Popup-Details">
                <p className="text-light">
                    Selected asteroid CHR: <strong>{obj.ps_cum}</strong> <br />
                    <span>{getRiskMessage(obj.ps_cum)}</span>
                </p>
                <p className="Ps_cum-Details">
                    The cumulative hazard rating refers to a measure that assesses the overall risk posed by a particular asteroid over time.
                </p>
            </div>
        </div>
    );
};

export default CardPopup;