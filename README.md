# Splotki – Fullstack E-commerce Platform

**Splotki** to w pełni funkcjonalna platforma e-commerce stworzona w celu nauki i praktyki programowania typu Fullstack.
Aplikacja obsługuje cały proces zakupowy – od dynamicznego wyświetlania asortymentu, przez zarządzanie koszykiem w czasie rzeczywistym, aż po finalizację zamówienia z zapisem do relacyjnej bazy danych.

---

## Główne Funkcjonalności

### Inteligentny Koszyk
* **Zarządzanie ilością**: Możliwość zwiększania/zmniejszania liczby sztuk (+/-) bezpośrednio w widoku koszyka oraz usuwanie produktów.
* **Obsługa duplikatów**: Jeśli produkt jest już w koszyku, ponowne dodanie go zwiększa jego ilość zamiast tworzyć nowy wiersz w bazie.
* **Licznik w czasie rzeczywistym**: Automatyczna aktualizacja ikonki koszyka na każdej podstronie serwisu.

### Obsługa Zamówień
* **Logika transakcyjna**: Wykorzystanie transakcji Prisma, co gwarantuje, że zamówienie zostanie zapisane, a koszyk wyczyszczony tylko w przypadku sukcesu obu operacji.
* **Rozbudowany formularz**: Podział na szczegółowe dane adresowe (ulica, miasto, kod pocztowy) dla lepszej jakości danych.
* **Walidacja danych**: Zabezpieczenie przed błędnymi danymi (np. wymuszony format kodu pocztowego `00-000` oraz 9-cyfrowy numer telefonu).

### Responsywność (RWD)
* Interfejs w pełni dostosowany do urządzeń mobilnych.

---

## Stack Technologiczny

* **Frontend**: JavaScript, HTML5, CSS3.
* **Backend**: Node.js, Express.js.
* **Baza danych & ORM**: Prisma ORM z relacyjną bazą danych SQL.

---

## Struktura Projektu

* `server.js` – Serwer Express z endpointami REST API (GET, POST, PATCH, DELETE).
* `cart.js` – Logika UI koszyka, obsługa liczników i wysyłka zamówienia do bazy.
* `produkty.js` – Pobieranie produktów z bazy i ich dynamiczne renderowanie w kategoriach.
* `style.css` – Kompletna stylizacja projektu, w tym warstwa responsywna.

---

## Instalacja i Uruchomienie

1. **Pobierz lub sklonuj repozytorium**

2. **W folderze "back" zainstaluj zależności:**
   ```bash
   npm install

3. **Stwórz plik .env w folderze "back"**
    - dodaj do niego ścieżkę do bazy danych
      ```bash
      DATABASE_URL="file:./dev.db"

4. **Skonfiguruj bazę danych:**
   Uruchom migracje, aby stworzyć strukturę tabel (zatwierdź zmiany, jeśli zostaniesz o to zapytany):
   ```bash
   npx prisma migrate dev --name init

5. **Wypełnienie bazy danymi**
   Aby dodać początkowe produkty do sklepu, uruchom skrypt seedujący:
   ```bash
   node prisma/seed.js

6. **Uruchom serwer**:
   ```bash
   node server.js
   ```
   Projekt stworzony z dbałością o czystość kodu i bezpieczeństwo danych (odporność na SQL Injection dzięki wykorzystaniu zapytań parametryzowanych w Prisma).

   
