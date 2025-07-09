document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const agentContainer = document.getElementById('agentContainer');
    const hiddenCardsContainer = document.getElementById('hiddenCards');

    if (loadMoreBtn && agentContainer && hiddenCardsContainer) {
        const cardsToLoad = Array.from(hiddenCardsContainer.children);

        loadMoreBtn.addEventListener('click', function() {
            cardsToLoad.forEach(card => {
                agentContainer.appendChild(card);
            });

            loadMoreBtn.style.display = 'none';
            hiddenCardsContainer.remove();
        });
    }
});