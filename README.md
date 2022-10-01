# Approval Adjusted Value at Risk Leaderboard

This tool queries a custom subgraph and extracts information about specific protocols, related to the DeFiPulse.com, calculates each protocols approval ajusted value at risk and displays information regarding the collected data. The information is displayed in specific protocol leader boards and line graphs.

## Built with

    - React js
    - Tailwind

## Run DApp

    - Clone the repo: https://github.com/Float-Capital/var-app.git
    - Run application: yarn start

## Usage

    - A loading spinner will be displayed on load for indexing the data from the subgraph
    - Once loaded a leader board will display for every protocol from the custom subgraph and their respective approval adjusted value at risk calculated. 
    - Clicking on a leader board entry will navigate the user to another page displaying information about that specific protocol.
    - "◀ BACK TO LEADER BOARD" button returns the users back to the leader board page.
    - Selecting the total amount of aaVaR from the leader page board will direct the user to another page displaying more indepth information about all protocols in in the subgraph.
    - Again, "◀ BACK TO LEADER BOARD" button returns the users back to the leader board page.
    - Hovering your mouse over any user address will display the users full address.

## Further work
    - Listening to current transfer and approval events to update the graph immediately so it acts as "live".
    - Include different filter events for the graphs depicting a specific protocol or all protocols.
