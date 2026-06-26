function PotionCard({ potion }) {
  return (
    <article className="potion-card">
      <img
        src={potion.imageUrl}
        alt={potion.name}
        onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/400/200'; }}
      />
      <div className="card-body">
        <h3>{potion.name}</h3>
        <p className="card-description">{potion.description}</p>
        <div className="card-footer">
          <span className="card-price">{potion.price} moedas</span>
          <button className="btn-buy">Comprar</button>
        </div>
      </div>
    </article>
  );
}

export default PotionCard;
