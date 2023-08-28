# budget-tracker-ui
Personal budget tracking app webUI

## TODO:
- Pages/components
    - [ ] Statistics page
        - [ ] Create design
    - [X] Expense editor modal window
        - [ ] Add toast message on successful/failed update, remove
        - [ ] Refetch expenses to update expense list
        - [ ] Fix category disabling
    - [ ] Settings tab
        - [ ] Create design
    - [ ] Refactor ExpenseNewRecord
    - [ ] ExpensesFilter clear category
- Features
    - [ ] Expenses import/export (csv, json)
    - [ ] Improve categories service
        - [ ] Add default categories (groceries, food, utility, health, sport, other etc.)
        - [ ] Add new categories (save to indexedDB/backend)
        - [ ] Add categories settings (separate section in settings)
    - [ ] Caching currency exchange rate, align everything to USD
    - [ ] Allow to create record without description
    - [X] Expenses pagination
- Other
    - [ ] Migrate to Vite
    - [x] Deploy to github pages