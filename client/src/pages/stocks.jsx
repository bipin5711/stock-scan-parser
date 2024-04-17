import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stocks.css";

export default function Stock() {
  const [stocks, setStocks] = useState();
  const [selectedStock, setSelectedStock] = useState();
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3000/data");
    setStocks(data);
  };
  const handleBack = () => {
    setSelectedStock();
  };
  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!stocks) {
    return "Loading!!!";
  }
  return (
    <div className="container">
      <div className="box">
        {selectedStock ? (
          <p className="title" onClick={handleBack}>
            Go Back to List
          </p>
        ) : null}
        {selectedStock ? (
          <div>
            <div className="selected-stock">
            <p className="title">{selectedStock.name}</p>
            <span style={{ color: selectedStock.color }}>
              {selectedStock.tag}
            </span>
            </div>
            {selectedStock.criteria.map((criteria, index) => (
              <div>
                {criteria.type == "plain_text" ? (
                  <>
                    <p className="title">{criteria.text}</p>
                    {index != selectedStock.criteria.length - 1 ? (
                      <p className="title">and</p>
                    ) : null}
                  </>
                ) : criteria.type == "variable" ? (
                  <>
                    <p className="title">
                      {criteria.text
                        .replace(
                          Object.keys(criteria.variable)?.[0],
                          criteria.variable[Object.keys(criteria.variable)?.[0]]
                            ?.default_value ||
                            criteria.variable[
                              Object.keys(criteria.variable)?.[0]
                            ]?.values[0]
                        )
                        .replace(
                          Object.keys(criteria.variable)?.[1],
                          criteria.variable[Object.keys(criteria.variable)?.[1]]
                            ?.default_value ||
                            criteria.variable[
                              Object.keys(criteria.variable)?.[1]
                            ]?.values?.[0]
                        )}
                    </p>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          stocks.map((stock) => (
            <div
              className="content-container"
              onClick={() => handleStockClick(stock)}
            >
              <p className="title">{stock.name}</p>
              <span style={{ color: stock.color }}>{stock.tag}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
