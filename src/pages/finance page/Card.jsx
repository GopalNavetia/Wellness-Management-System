import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

export default function FinanceCard({ title, value, icon, type }) {
  return (
    <div className={`summary-card ${type}`}>
      <div className="summary-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="summary-details">
        <p className="summary-title">{title}</p>
        <h3 className="summary-value">{value}</h3>
      </div>
    </div>
  );
}

