# budget-tracker
Personal budget tracking app webUI

## TODO:
- Pages/components
    - [ ] Statistics page
        - [ ] Create design
    - [X] Expense editor modal window
    - [ ] Settings tab
        - [ ] Create design
    - [ ] ExpenseNewRecord refactor 
- Features
    - [ ] Expenses export (csv, json)
    - [ ] Categories service
        - [X] Add default categories (groceries, food, utility, health, sport, other etc.)
        - [X] Save to indexedDB/backend new categories
        - [X] Filter expenses: search categories by entered word beginning
        - [ ] Add categories settings (separate section in settings)
    - [X] Currency service
        - [X] Store list of currencies in db
        - [ ] Caching currency exchange rate, align everything to primary currency (USD or EUR for now) (available currencies exchange rates: [GEL](https://nbg.gov.ge/en/monetary-policy/currency), [RSD](https://kurs.resenje.org/doc/?shell#authentication))
        - [ ] Add currencies settings (separate section in settings)
    - [X] Expenses pagination
    - [ ] Store user settings in (localStorage)[https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage] 
- Other
    - [ ] Migrate to Vite
    - [x] Deploy to github pages