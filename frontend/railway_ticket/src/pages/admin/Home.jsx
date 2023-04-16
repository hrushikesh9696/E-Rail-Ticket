import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <div className="row p-2">
        <p class="text-center fs-1" id="adminHead">Admin Dashboard</p>
        <div class="col-md-6 cardx">
          <a class="text-decoration-none bg-custom">
            <div class="card paint-card">
              <div class="card-body text-center">
                <i class="bi bi-journal-check fa-2x"></i>
                <br />
                <p class="fs-3 text-dark"> Train</p>
                <p class="fs-3 text-dark"></p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-6">
          <a class="text-decoration-none bg-custom">
            <div class="card paint-card ">
              <div class="card-body text-center">
                <i class="bi bi-minecart fa-2x"></i>
                <br />
                <p class="fs-3 text-dark">Ticket</p>
                <p class="fs-3 text-dark"></p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};





export default Home;
