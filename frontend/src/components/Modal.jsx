const Modal = ({ user, onClose, isOpen }) => {
    if (!isOpen || !user) {
        return null;
    }

    return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes de {user.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={user.imageUrl} alt="Profile Picture"/>
            <p className="pt-4"><strong>Nome:</strong> {user.name}</p>
            <p><strong>Idade:</strong> {user.age}</p>
            <p><strong>Endereço:</strong> {user.street}, {user.neighborhood} - {user.city}</p>
            <p><strong>Biografia:</strong> {user.biography}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal