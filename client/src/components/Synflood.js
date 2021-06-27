/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

const Synflood = () => {
  const [synData, setSynData] = useState(false);
  const [visible, setVisible] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    fetchData();
    if (Array.isArray(synData)) {
      setLength(synData.length);
    }
  }, [visible, length]);
  const getData = () => {
    setVisible(true);
  };
  async function fetchData() {
    await fetch("/synflood")
      .then((res) => {
        return res.json();
      })
      .then((data) => setSynData([...data]));
  }
  const headers = ["File", "Time", "Count", "Source", "Source_Mac", "Info"];
  return (
    <div className="data-content">
      <div className="data-table">
        <button className="form-control-button" onClick={getData}>
          Load data
        </button>
        {visible && (
          <div className="table-inside">
            <h3>Found {length} possible threat&#40;s&#41;</h3>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    {headers.map((head, index) => (
                      <th data-tip data-for={index} id={index} key={index}>
                        {head}
                      </th>
                    ))}
                  </tr>
                  <ReactTooltip id="0" place="top" effect="solid">
                    This is the name of the file you sent us.
                  </ReactTooltip>
                  <ReactTooltip id="1" place="top" effect="solid">
                    This is the time of a possible attack.
                  </ReactTooltip>
                  <ReactTooltip id="2" place="top" effect="solid">
                    This is a number of times a possible attacker sent a syn
                    message is one second.
                  </ReactTooltip>
                  <ReactTooltip id="3" place="top" effect="solid">
                    This is a possible attacker's IP address.
                  </ReactTooltip>
                  <ReactTooltip id="4" place="top" effect="solid">
                    This is a possible attacker's MAC address.
                  </ReactTooltip>
                  <ReactTooltip id="5" place="top" effect="solid">
                    This is additional information abut the packet.
                  </ReactTooltip>
                </thead>
                <tbody>
                  {synData.map((elem, index) => {
                    return (
                      <tr key={index}>
                        <td>{elem.File}</td>
                        <td>{elem.Time}</td>
                        <td className="bold-data">{elem.Count}</td>
                        <td>{elem.Source}</td>
                        <td>{elem.Source_Mac}</td>
                        <td>{elem.Info}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <span className="data-vertical-line"></span>
      <div className="data-info">
        <h2 className="clients-section-text">syn flood attack</h2>
        <span className="horizontal-line">
          <hr></hr>
        </span>
        <article>
          <h3>What's a SYN flood attack?</h3>
          <p>
            Establishing TCP connection between your client and your server
            starts when you client sends a SYN message, then your server
            responds with ACK-SYN message and creates a space in memory fot a
            TCP session and waits for the SYN-ACK message from the client.
            <br />
            Durring a SYN flood, an attacker sends many SYN messages and never
            responds to server's ACk-SYN message.
          </p>
        </article>
        <article>
          <h3>Why should I be worried?</h3>
          <p>
            The reserved memory for multiple TCP connections renders your server
            unable to respond to any, even legitimate requests from your
            clients.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Synflood;
