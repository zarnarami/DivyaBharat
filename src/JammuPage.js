// JammuPage.js

import React from "react";
import "./JammuPage.css";

import templeImg from "./assets/jammu1_katra.png";

function JammuPage() {

  return (

    <div className="jammu-page">

      {/* HERO IMAGE */}

      <div className="jammu-hero">

        <img
          src={templeImg}
          alt="Vaishno Devi Temple"
        />

        <div className="hero-overlay"></div>

        <div className="hero-text">

          <h1>
            Vaishno Devi Temple
          </h1>

          <p>
            Katra, Jammu & Kashmir
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="jammu-content">

        <section>

          <h2>
            Location and Significance
          </h2>

          <p>
            Vaishno Devi Temple, located in Katra,
            Jammu and Kashmir, is one of India’s
            most revered Hindu pilgrimage sites,
            dedicated to Goddess Vaishno Devi,
            a manifestation of Mahakali,
            Mahalakshmi, and Mahasaraswati.
          </p>

          <p>
            The temple is situated in the
            Trikuta Hills near Katra,
            approximately 61 km from Jammu city,
            at an elevation of 5,200 feet.
            It is considered one of the
            108 Shakti Peethas.
          </p>

        </section>

        <section>

          <h2>
            History and Legends
          </h2>

          <p>
            According to legend,
            Vaishno Devi took refuge in the
            Trikuta Hills to escape the demon
            Bhairon Nath, whom she later defeated.
          </p>

          <p>
            Pilgrims traditionally visit the
            Bhairon Nath Temple after the
            main shrine because the yatra is
            believed to be incomplete without it.
          </p>

        </section>

        <section>

          <h2>
            Vaishno Devi Yatra
          </h2>

          <ul>

            <li>
              Banganga – holy river
            </li>

            <li>
              Charan Paduka
            </li>

            <li>
              Ardhkuwari Cave
            </li>

            <li>
              Sanjichhat
            </li>

          </ul>

          <p>
            Pilgrims can also use ponies,
            palkis, battery vehicles,
            helicopter services,
            and ropeways.
          </p>

        </section>

        <section>

          <h2>
            Darshan & Aarti
          </h2>

          <p>
            Morning Aarti:
            6:20 AM – 8:00 AM
          </p>

          <p>
            Evening Aarti:
            7:20 PM – 8:30 PM
          </p>

        </section>

        <section>

          <h2>
            Best Time to Visit
          </h2>

          <p>
            March–June and
            September–October
            are considered ideal
            for pilgrimage.
          </p>

        </section>

      </div>

    </div>
  );
}

export default JammuPage;