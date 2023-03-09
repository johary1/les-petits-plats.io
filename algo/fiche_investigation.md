Fiche d’investigation de fonctionnalité
Fonctionnalité : Recherche de recettes
Problématique
Nous cherchons à améliorer la recherche de recettes sur notre site web en termes de performance et d'efficacité.

Option 1 : Utilisation de la méthode filter
Dans cette option, nous utilisons la méthode filter pour filtrer les recettes en fonction des mots-clés entrés dans la barre de recherche. Si aucun mot-clé n'est entré, toutes les recettes sont renvoyées.

Avantages

Utilisation de la méthode filter standard de JavaScript
Implémentation simple et facile à comprendre

Inconvénients

Peut être moins performante pour des volumes importants de données
Possibilité de générer des résultats incohérents ou incorrects

Option 2 : Utilisation d'une boucle for

Dans cette option, nous utilisons une boucle for pour parcourir toutes les recettes et les comparer à chaque mot-clé entré dans la barre de recherche. Si un mot-clé correspond à un élément de la recette, celle-ci est ajoutée à la liste des recettes filtrées.

Avantages

Meilleure performance pour des volumes importants de données
Possibilité de générer des résultats plus précis

Inconvénients

Implémentation plus complexe et moins facile à comprendre
Risque de répétitions de code

Solution retenue
Nous avons choisi d'utiliser la méthode filter pour sa simplicité et sa facilité de compréhension. Bien que l'option 2 offre des avantages en termes de performance et de précision, nous avons décidé que la clarté et la simplicité de l'option 1 étaient plus importantes pour une expérience utilisateur agréable.
