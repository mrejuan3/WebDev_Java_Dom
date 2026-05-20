const name = prompt('Welcome! What is your name?');
if (name) {
  document.querySelector('#welcome').textContent = `Welcome, ${name}!`;
}

async function loadListings() {
  const res = await fetch('./airbnb_sf_listings_500.json');
  const listings = await res.json();
  const container = document.querySelector('#listings');

  listings.slice(0, 50).forEach((listing) => {
    const amenities = JSON.parse(listing.amenities).slice(0, 5);

    const col = document.createElement('div');
    col.className = 'listing col-6 mb-4';
    col.innerHTML = `
      <article class="card h-100">
        <img
          src="${listing.picture_url}"
          alt="${listing.name}"
          class="card-img-top listing-thumb"
          referrerpolicy="no-referrer"
        />
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <img
              src="${listing.host_thumbnail_url}"
              alt="${listing.host_name}"
              class="host-photo rounded-circle me-2"
              referrerpolicy="no-referrer"
            />
            <span class="host-name text-muted small">Hosted by ${listing.host_name}</span>
          </div>
          <h3 class="card-title fs-6 fw-bold">${listing.name}</h3>
          <div class="price fw-semibold text-success mb-2">${listing.price} / night</div>
          <div class="description overflow-auto mb-2" style="max-height: 80px; font-size: 0.85rem">
            ${listing.description}
          </div>
          <ul class="amenities list-unstyled mb-3" style="font-size: 0.8rem">
            ${amenities.map((a) => `<li>&#10003; ${a}</li>`).join('')}
          </ul>
          <div class="mt-auto">
            <button class="btn btn-primary btn-sm">Rent</button>
          </div>
        </div>
      </article>
    `;
    container.appendChild(col);
  });
}

loadListings();
