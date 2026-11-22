# CV

`cv.html` est la source du CV publié sur le portfolio (`public/CV_Adam_Bettayeb.pdf`).

Pour régénérer le PDF après une modification (Chrome doit être installé) :

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="public/CV_Adam_Bettayeb.pdf" "file:///E:/Porfolio/cv/cv.html"
```

Le CV tient sur une page A4 : vérifier le PDF après chaque ajout de contenu.
