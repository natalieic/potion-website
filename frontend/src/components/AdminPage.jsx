import { useState, useEffect } from 'react';

const EMPTY_FORM = { name: '', description: '', imageUrl: '', price: '' };

function AdminPage() {
  const [potions, setPotions] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // { type: 'error'|'success', msg }

  useEffect(() => { loadPotions(); }, []);

  async function loadPotions() {
    try {
      const res = await fetch('/api/potions');
      const data = await res.json();
      setPotions(data);
    } catch {
      setStatus({ type: 'error', msg: 'Erro ao carregar poções.' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setStatus(null);

    if (!form.name || !form.price) {
      setStatus({ type: 'error', msg: 'Nome e preço são obrigatórios.' });
      return;
    }

    try {
      const res = await fetch('/api/potions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageUrl: form.imageUrl || null, price: Number(form.price) }),
      });

      if (!res.ok) throw new Error();
      setForm(EMPTY_FORM);
      setStatus({ type: 'success', msg: 'Poção criada com sucesso!' });
      loadPotions();
    } catch {
      setStatus({ type: 'error', msg: 'Erro ao criar poção.' });
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Remover "${name}"?`)) return;

    try {
      const res = await fetch(`/api/potions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      loadPotions();
    } catch {
      setStatus({ type: 'error', msg: 'Erro ao remover poção.' });
    }
  }

  return (
    <div className="admin-layout">
      <h2>Administração</h2>

      {/* ── CREATE FORM ── */}
      <div className="admin-form">
        <h3>Nova Poção</h3>
        <form onSubmit={handleCreate}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome *</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Poção Blue Sky"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Preço (moedas) *</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="300"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL da Imagem</label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Efeitos e propriedades da poção…"
            />
          </div>

          <button type="submit" className="btn-primary">Adicionar Poção</button>

          {status && (
            <p className={status.type === 'error' ? 'form-error' : 'form-success'}>
              {status.msg}
            </p>
          )}
        </form>
      </div>

      {/* ── POTION LIST ── */}
      <h3 style={{ marginBottom: '1rem' }}>Poções Cadastradas</h3>

      {loading && <p className="loading">Carregando…</p>}

      {!loading && potions.length === 0 && (
        <p className="empty">Nenhuma poção cadastrada.</p>
      )}

      {!loading && potions.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {potions.map(p => (
              <tr key={p.id}>
                <td>
                  <img
                    className="thumb"
                    src={p.imageUrl || 'https://picsum.photos/seed/fallback/52/40'}
                    alt={p.name}
                    onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/52/40'; }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.price} moedas</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
