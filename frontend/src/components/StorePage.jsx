import { useState, useEffect } from 'react';
import PotionCard from './PotionCard';
import historyImg from '../assets/history.jpg';

function StorePage() {
  const [potions, setPotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/potions')
      .then(res => res.json())
      .then(data => { setPotions(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <p className="hero-eyebrow">Beco da Última Saída, nº 13</p>
        <h1>Poções e Soluções</h1>
        <p className="hero-tagline">
          Magias, mistérios e remédios raros — desde 1867.
        </p>
      </section>

      <hr className="divider" />

      {/* ── SOBRE A LOJA ── */}
      <section className="section">
        <h2 className="section-title">Sobre a Loja</h2>
        <p>
          Fundada pela visionária Annabelle Merigold, a <em>Poções e Soluções</em> é o
          estabelecimento mais respeitado de magia aplicada do Beco da Última Saída.
          Aqui você encontra desde poções de inspiração criativa até os mais potentes
          elixires de transformação — tudo manipulado com ingredientes selecionados e
          décadas de expertise alquímica.
        </p>
        <p>
          Cada frasco vendido carrega a garantia de autenticidade da nossa alquimista-chefe.
          Encomendas especiais são aceitas mediante consulta prévia.
        </p>
      </section>

      <hr className="divider" />

      {/* ── HISTÓRIA ── */}
      <section className="section">
        <h2 className="section-title">Nossa História</h2>
        <div className="history-grid">
          <div>
            <p>
              Fundada em 1867 no Beco da Última Saída, <b>Poções e Soluções</b> nasceu como uma
              pequena botica dedicada a remédios, tônicos e preparados para viajantes que
              atravessavam a cidade em busca de trabalho, cura ou simplesmente de um novo começo.
            </p>
            <p>
              Ao longo de mais de 150 anos e cinco gerações, a loja sobreviveu a guerras,
              pandemias e à tentativa fracassada de cadastro no iFood. Hoje, sob o comando
              de Annabelle Merigold, o catálogo conta com dezenas de fórmulas exclusivas,
              mantendo vivo o legado de excelência alquímica da família.
            </p>
          </div>
          <img
            src={historyImg}
            alt="Fachada da loja depois da restauração em 2008"
          />
        </div>
      </section>

      <hr className="divider" />

      {/* ── PRODUTOS ── */}
      <section className="section" id="produtos">
        <h2 className="section-title">Nossas Poções</h2>
        {loading && <p className="loading">Preparando o caldeirão…</p>}
        {!loading && potions.length === 0 && (
          <p className="empty">Nenhuma poção disponível no momento.</p>
        )}
        {!loading && potions.length > 0 && (
          <div className="potions-grid">
            {potions.map(p => <PotionCard key={p.id} potion={p} />)}
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p className="footer-brand">Poções e Soluções</p>
        <p>Beco da Última Saída, nº 13 · Hogsmeade</p>
        <p>contato@pocoessolucoes.com · (11) 9 8765-4321</p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
          © 1867–{new Date().getFullYear()} Poções e Soluções. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}

export default StorePage;
