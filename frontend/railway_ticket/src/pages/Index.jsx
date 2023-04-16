import { Footer } from "../component/Footer";

const Index = () => {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../img/rail1.jpg"
              class="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="../img/rail2.jpg"
              class="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="../img/rail3.jpg"
              class="d-block w-100"
              height="450px"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <p className="fs-3 text-center">About Us</p>

        <div class="row p-4">
          <div class="col-md-6">
            <img src="../img/rail3.jpg" width="100%" height="90%" />
          </div>
          <div className="col-md-6 p-5">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
        </div>

        <div className="text-center mt-2">
          {/* <Link to="" className="btn btn-danger btn-sm">
            view all
          </Link> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Index };
