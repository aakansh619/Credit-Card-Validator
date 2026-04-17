import React, { useState } from "react";
import validator from "validator";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [credit, setCredit] = useState("");

  const luhnCheck = (number) => {
    let sum = 0;
    let alternate = false;

    number = number.replace(/\s+/g, "");

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (isNaN(digit)) return false;

      if (alternate) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  };

  const validateCreditCard = () => {
    if (credit === "") {
      setErrorMessage("⚠️ Please enter a card number");
      setFlag(false);
      return;
    }

    if (validator.isCreditCard(credit) && luhnCheck(credit)) {
      setErrorMessage("✅ Valid Credit Card Number");
      setFlag(true);
    } else {
      setErrorMessage("❌ Invalid Credit Card Number");
      setFlag(false);
    }
  };

  // format card number
  const formatCard = (num) => {
    return num
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Orbitron', sans-serif",
        background:
          "linear-gradient(135deg, #0a0f1f, #1a2a4f, #0f2027)",
      }}
    >
      {/* 🔥 Animated light streak */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background:
            "linear-gradient(120deg, transparent, rgba(0,255,255,0.08), transparent)",
          animation: "moveBg 8s linear infinite",
          zIndex: 0,
        }}
      />

      {/* 🔢 Grid overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* 🔥 MAIN CONTENT WRAPPER */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 💳 CARD */}
        <div
          style={{
            width: "340px",
            height: "200px",
            borderRadius: "15px",
            padding: "20px",
            color: "#fff",
            background:
              "linear-gradient(135deg, #1f4037, #99f2c8)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            marginBottom: "30px",
            transition: "transform 0.4s",
          }}
          onMouseMove={(e) => {
            e.currentTarget.style.transform =
              "rotateY(10deg) rotateX(10deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotateY(0deg)";
          }}
        >
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            CREDIT CARD
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              letterSpacing: "3px",
              fontFamily: "'Roboto Mono', monospace",
            }}
          >
            {credit
              ? formatCard(credit)
              : "1234 5678 9012 3456"}
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <div>
              <div style={{ opacity: 0.7 }}>CARD HOLDER</div>
              <div>YOUR NAME</div>
            </div>
            <div>
              <div style={{ opacity: 0.7 }}>EXPIRES</div>
              <div>12/30</div>
            </div>
          </div>
        </div>

        {/* INPUT BOX */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            padding: "30px",
            borderRadius: "12px",
            width: "320px",
          }}
        >
          <input
            type="text"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            placeholder="Enter card number"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginBottom: "15px",
              fontSize: "16px",
              fontFamily: "'Roboto Mono', monospace",
              letterSpacing: "2px",
            }}
          />

          <button
            onClick={validateCreditCard}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Validate Card
          </button>

          <div
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: flag ? "#00ff9d" : "#ff4d4d",
              fontWeight: "600",
            }}
          >
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;