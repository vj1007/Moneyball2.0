from flask import Flask, jsonify, request
import base64
from flask_cors import CORS
import pulp
from pulp import LpMaximize, LpMinimize, LpProblem, LpVariable, lpSum
import pandas as pd
import logging
import sys
app = Flask(__name__)
CORS(app)

def player_stats(player_name, position):
    if(position == 'att'):
        player_df = pd.read_csv('Attackers_DB(3).csv')
        player_df1 = pd.read_csv('Attackers_DB1.csv')
        player_stats_array = []

        player_goals = float(player_df.loc[player_df['player'] == player_name, 'goals'].values[0])
        player_stats_array.append(player_goals)
        player_assists = float(player_df.loc[player_df['player'] == player_name, 'assists'].values[0])
        player_stats_array.append(player_assists)
        player_xg = float(player_df.loc[player_df['player'] == player_name, 'xg'].values[0])
        player_stats_array.append(player_xg)
        player_xa = float(player_df.loc[player_df['player'] == player_name, 'xg_assist'].values[0])
        player_stats_array.append(player_xa)
        player_shots_pct = float(player_df.loc[player_df['player'] == player_name, 'shots_on_target_pct'].values[0])
        player_stats_array.append(player_shots_pct)  
        
        
        return player_stats_array  
    elif(position == 'mid'):
        player_df = pd.read_csv('Midfielders_DB.csv')
        player_stats_array = []
        player_goals = float(player_df.loc[player_df['player'] == player_name, 'goals'].values[0])
        player_stats_array.append(player_goals)
        player_assists = float(player_df.loc[player_df['player'] == player_name, 'assists'].values[0])
        player_stats_array.append(player_assists)
        player_xa = float(player_df.loc[player_df['player'] == player_name, 'xg_assist'].values[0])
        player_stats_array.append(player_xa)
        player_take_on_pct = float(player_df.loc[player_df['player'] == player_name, 'take_ons_won_pct'].values[0])
        player_stats_array.append(player_take_on_pct)
        player_pass_pct = float(player_df.loc[player_df['player'] == player_name, 'passes_pct'].values[0])
        player_stats_array.append(player_pass_pct)  
        
        return player_stats_array 
    elif(position == 'def'):
        player_df = pd.read_csv('Defenders_DB.csv')
        player_stats_array = []
        player_challenges = float(player_df.loc[player_df['player'] == player_name, 'challenge_tackles_pct'].values[0])
        player_stats_array.append(player_challenges)
        player_aerial = float(player_df.loc[player_df['player'] == player_name, 'aerials_won_pct'].values[0])
        player_stats_array.append(player_aerial)
        player_interception = float(player_df.loc[player_df['player'] == player_name, 'interceptions'].values[0])
        player_stats_array.append(player_interception)
        player_take_on_pct = float(player_df.loc[player_df['player'] == player_name, 'take_ons_won_pct'].values[0])
        player_stats_array.append(player_take_on_pct)
        player_clearance = float(player_df.loc[player_df['player'] == player_name, 'clearances'].values[0])
        player_stats_array.append(player_clearance)  
        return player_stats_array 
    elif (position == 'gk'):
        player_df = pd.read_csv('Goalkeepers_DB.csv')
        player_stats_array = []
        player_gk_saves_pct = float(player_df.loc[player_df['player'] == player_name, 'gk_save_pct'].values[0])
        player_stats_array.append(player_gk_saves_pct)
        player_gk_pens_save_pct = float(player_df.loc[player_df['player'] == player_name, 'gk_pens_save_pct'].values[0])
        player_stats_array.append(player_gk_pens_save_pct)
        player_pass_pct_launched = float(player_df.loc[player_df['player'] == player_name, 'gk_passes_pct_launched'].values[0])
        player_stats_array.append(player_pass_pct_launched)
        player_cleansheet_pct = float(player_df.loc[player_df['player'] == player_name, 'gk_clean_sheets_pct'].values[0])
        player_stats_array.append(player_cleansheet_pct)
         
        return player_stats_array 


def team_stats_chart(input_team_name):
    merged_df = pd.read_csv('teams_merged_df.csv')
    if input_team_name in merged_df['team'].values:
        league_name = merged_df.loc[merged_df['team'] == input_team_name, 'comp_for'].values[0]
        print("team found",flush=True)
        # possession_for_team = merged_df.loc[merged_df['team'] == input_team_name, 'possession_for'].values[0]
        # print(possession_for_team)

        if league_name == 'eng Premier League':
            stats_array = []
            include_columns = ['goals_for', 'assists_for', 'passes_pct_team', 'challenges_tackles_pct', 'aerials_won_pct']
            columns_to_include = [col for col in merged_df.columns if col in include_columns]
            print('cols to inclus',columns_to_include)
            input_team_goals = float(merged_df.loc[merged_df['team'] == input_team_name, 'goals_for'].values[0])
            input_team_assists = float(merged_df.loc[merged_df['team'] == input_team_name, 'assists_for'].values[0])
            stats_array.append(input_team_goals)
            stats_array.append(input_team_assists)
            print("input valuse",input_team_goals,input_team_assists)
            Midfielders_DB = pd.read_csv('Midfielders_DB.csv')
            team_pass_accuracy = float(Midfielders_DB.loc[Midfielders_DB['team_team'] == input_team_name, 'passes_pct_team'].values[0])
            print(team_pass_accuracy)
            stats_array.append(team_pass_accuracy)

            
            Defenders_DB = pd.read_csv('Defenders_DB.csv')
            team_challenge_accuracy = float(Defenders_DB.loc[Defenders_DB['team_team'] == input_team_name, 'challenge_tackles_pct_team'].values[0])
            team_aerials_accuracy = float(Defenders_DB.loc[Defenders_DB['team_team'] == input_team_name, 'aerials_won_pct_team'].values[0])
            print(team_challenge_accuracy)
            print(team_aerials_accuracy)
            stats_array.append(team_challenge_accuracy)
            stats_array.append(team_aerials_accuracy)
            print("Stat",stats_array)
            # Get Assist difference value
            return stats_array
            
        else:
            return "The league is not EPL."
    else:
        return "Team not found in the DataFrame."
    

def team_comparison_algo(input_team_name):
    merged_df = pd.read_csv('teams_merged_df.csv')
    if input_team_name in merged_df['team'].values:
        league_name = merged_df.loc[merged_df['team'] == input_team_name, 'comp_for'].values[0]
        print("team found",flush=True)
        # possession_for_team = merged_df.loc[merged_df['team'] == input_team_name, 'possession_for'].values[0]
        # print(possession_for_team)

        if league_name == 'eng Premier League':
            man_city_row = merged_df.loc[merged_df['team'] == 'manchester city']
            exclude_columns = ['comp_for', 'comp_vs', 'team']
            columns_to_compare = [col for col in merged_df.columns if col not in exclude_columns]
            man_city_values = pd.to_numeric(man_city_row[columns_to_compare].values.flatten())
            input_team_values = pd.to_numeric(merged_df.loc[merged_df['team'] == input_team_name, columns_to_compare].values.flatten())
            # Calculate the difference between columns for 'Man City' and the input team
            difference = man_city_values - input_team_values
            # Compare all columns with the input team
            difference_df = pd.DataFrame({'Column': columns_to_compare, 'Difference': difference})
            # Get Goal difference value
            goal_difference_value = difference_df.loc[difference_df['Column'] == 'goals_for', 'Difference'].values[0]
            print("Difference value is", goal_difference_value)
            # Get Assist difference value
            return goal_difference_value
            
        else:
            return "The league is not EPL."
    else:
        return "Team not found in the DataFrame."
    

def optimization_att_algo(budget, specified_team, num_players_required, goal_diff_input):
    Attackers_DB = pd.read_csv('Attackers_DB(3).csv')
    Attackers_DB = Attackers_DB[Attackers_DB['team_team']==specified_team]
    goal_diff_input = int(goal_diff_input)
    num_players_required = int(num_players_required)
    budget = int(budget)
    prob = LpProblem("Team_Selection", LpMinimize)
    player_vars = LpVariable.dicts("Player", Attackers_DB['player'], cat='Binary')
    prob += lpSum([player_vars[player] * Attackers_DB.loc[Attackers_DB['player'] == player, 'predicted_goals'].values[0]
                   for player in Attackers_DB['player']]), "Maximize_Predicted_Goals"
    prob += lpSum([-player_vars[player] * Attackers_DB.loc[Attackers_DB['player'] == player, 'predicted_assists'].values[0]
                   for player in Attackers_DB['player']]), "Minimize_Predicted_Assists"
    prob += lpSum([player_vars[player] * Attackers_DB.loc[Attackers_DB['player'] == player, 'cost'].values[0]
                   for player in Attackers_DB['player']]) <= budget, "Budget_Constraint"
    prob += lpSum([player_vars[player] for player in Attackers_DB[Attackers_DB['team_team'] == specified_team]['player']]) == num_players_required, "Players_Required"
    prob += lpSum([player_vars[player] * Attackers_DB.loc[Attackers_DB['player'] == player, 'predicted_goals'].values[0]
                   for player in Attackers_DB['player']]) >= goal_diff_input, "Goal_Difference_Constraint"
    prob.solve()
    selected_players = [player for player, var in player_vars.items() if var.value() == 1]
    selected_players_df = Attackers_DB[Attackers_DB['player'].isin(selected_players)][['player','team_player', 'team_team', 'predicted_goals', 'predicted_assists', 'cost']]
    print(f'slc',selected_players_df)
    return selected_players_df


def optimization_mid_algo(num_players_required, budget, specified_team, team_pass_accuracy):

    Midfielders_DB = pd.read_csv('Midfielders_DB.csv')
    print(f"mid",Midfielders_DB)
    Midfielders_DB = Midfielders_DB[Midfielders_DB['team_team']==specified_team]
    print('tta',Midfielders_DB)
    team_pass_accuracy = float(team_pass_accuracy)
    num_players_required = int(num_players_required)
    budget = int(budget)
    # Create the problem
    prob = LpProblem("Team_Selection", LpMaximize)

    # Create binary variables for each player (1 if selected, 0 otherwise)
    player_vars = LpVariable.dicts("Player", Midfielders_DB['player'], cat='Binary')

    # Objective function: maximize predicted assists while minimizing cost
    prob += lpSum([player_vars[player] * (Midfielders_DB.loc[Midfielders_DB['player'] == player, 'predicted_assists'].values[0]) for player in Midfielders_DB[Midfielders_DB['team_team'] == specified_team]['player']]), "Maximize_Assists"

    # Constraints
    prob += lpSum([player_vars[player] for player in Midfielders_DB[Midfielders_DB['team_team'] == specified_team]['player']]) == num_players_required, "Players_Required"

    prob += lpSum([player_vars[player] * Midfielders_DB.loc[Midfielders_DB['player'] == player, 'predicted_pass_pct'].values[0] for player in Midfielders_DB[Midfielders_DB['team_team'] == specified_team]['player']]) >= team_pass_accuracy*num_players_required, "Pass_Accuracy_Constraint"

    prob += lpSum([player_vars[player] * Midfielders_DB.loc[Midfielders_DB['player'] == player, 'cost'].values[0] for player in Midfielders_DB[Midfielders_DB['team_team'] == specified_team]['player']]) <= budget, "Budget_Constraint"

   

    # Solve the problem
    prob.solve()

    # Extract the selected players
    selected_players = [player for player, var in player_vars.items() if var.value() == 1]
    selected_players_df = Midfielders_DB[Midfielders_DB['player'].isin(selected_players)][['player','team_player', 'team_team', 'predicted_pass_pct', 'predicted_assists', 'cost']]
    #selected_players_df = selected_players_df[selected_players_df['team_team'] == specified_team]
    print(selected_players)

    return selected_players_df
def optimization_def_algo(num_players_required, budget, specified_team, team_challenge_accuracy, team_aerials_accuracy):
    Defenders_DB = pd.read_csv('Defenders_DB.csv')
    print(f"mid",Defenders_DB)
    Defenders_DB = Defenders_DB[Defenders_DB['team_team']==specified_team]
    print('tta',Defenders_DB)
    team_challenge_accuracy = float(team_challenge_accuracy)
    team_aerials_accuracy = float(team_aerials_accuracy)
    num_players_required = int(num_players_required)
    budget = int(budget)
    # Create the problem
    prob = LpProblem("Team_Selection", LpMaximize)

    # Create binary variables for each player (1 if selected, 0 otherwise)
    player_vars = LpVariable.dicts("Player", Defenders_DB['player'], cat='Binary')

    # Constraints
    prob += lpSum([player_vars[player] for player in Defenders_DB[Defenders_DB['team_team'] == specified_team]['player']]) == num_players_required, "Players_Required"

    prob += lpSum([player_vars[player] * Defenders_DB.loc[Defenders_DB['player'] == player, 'predicted_tacklepct'].values[0] for player in Defenders_DB[Defenders_DB['team_team'] == specified_team]['player']]) >= team_challenge_accuracy*num_players_required, "Challenge_Accuracy_Constraint"

    prob += lpSum([player_vars[player] * Defenders_DB.loc[Defenders_DB['player'] == player, 'predicted_aerialpct'].values[0] for player in Defenders_DB[Defenders_DB['team_team'] == specified_team]['player']]) >= team_aerials_accuracy*num_players_required, "Aerial_Accuracy_Constraint"

    prob += lpSum([player_vars[player] * Defenders_DB.loc[Defenders_DB['player'] == player, 'cost'].values[0] for player in Defenders_DB[Defenders_DB['team_team'] == specified_team]['player']]) <= budget, "Budget_Constraint"

    # Additional constraints (excluding previously selected players)
    

    # Solve the problem
    prob.solve()

    # Extract the selected players
    selected_players = [player for player, var in player_vars.items() if var.value() == 1]
    print(selected_players)
    selected_players_df = Defenders_DB[Defenders_DB['player'].isin(selected_players)][['player','team_player', 'team_team', 'predicted_tacklepct', 'predicted_aerialpct', 'cost']]


    return selected_players_df
def optimization_gk_algo(num_players_required, budget, specified_team, team_savepct):
    Goalkeepers_DB = pd.read_csv('Goalkeepers_DB.csv')
    print(f"mid",Goalkeepers_DB)
    Goalkeepers_DB = Goalkeepers_DB[Goalkeepers_DB['team_team']==specified_team]
    team_savepct = float(team_savepct)
    num_players_required = int(num_players_required)
    budget = int(budget)
    # Create the problem
    prob = LpProblem("Team_Selection", LpMaximize)

    # Create binary variables for each player (1 if selected, 0 otherwise)
    player_vars = LpVariable.dicts("Player", Goalkeepers_DB['player'], cat='Binary')

    # Constraints
    prob += lpSum([player_vars[player] for player in Goalkeepers_DB[Goalkeepers_DB['team_team'] == specified_team]['player']]) == num_players_required, "Players_Required"

    prob += lpSum([player_vars[player] * Goalkeepers_DB.loc[Goalkeepers_DB['player'] == player, 'predicted_savepct'].values[0] for player in Goalkeepers_DB[Goalkeepers_DB['team_team'] == specified_team]['player']]) >= team_savepct, "Save percentage Constraint"

    prob += lpSum([player_vars[player] * Goalkeepers_DB.loc[Goalkeepers_DB['player'] == player, 'cost'].values[0] for player in Goalkeepers_DB[Goalkeepers_DB['team_team'] == specified_team]['player']]) <= budget, "Budget_Constraint"

    

    # Solve the problem
    prob.solve()

    # Extract the selected players
    selected_players = [player for player, var in player_vars.items() if var.value() == 1]
    print(selected_players)

    selected_players_df = Goalkeepers_DB[Goalkeepers_DB['player'].isin(selected_players)][['player','team_player', 'team_team', 'predicted_savepct', 'cost']]

    return selected_players_df




    
@app.route('/run', methods=['POST'])

def run_script():
    try:
        # Getting data from the JSON request body
        data = request.get_json()

        merged = pd.read_csv('teams_merged_df.csv')
        pl = pd.read_csv('attackers_db.csv')

        print("df",merged)
        print("pl",pl)

        # Accessing values from the received data
        specified_team = data.get('team')
        num_players_required = data.get('noofplayers')
        position = data.get('position')
        budget = data.get('budget')

        print(f"Budget is {budget}", flush=True)

        

        

        

        

        print(f"Budget now is {budget}", flush=True)

        if( position == 'att'):
            # Perform any necessary processing with the received values
            goal_difference = team_comparison_algo(specified_team)
            # try:
            players_list = optimization_att_algo(budget, specified_team, num_players_required, goal_difference)
            print(f"player lisr",players_list)
            print("oming here")
        elif ( position == 'mid'):
            Midfielders_DB = pd.read_csv('Midfielders_DB.csv')
            team_pass_accuracy = float(Midfielders_DB.loc[Midfielders_DB['team_team'] == specified_team, 'passes_pct_team'].values[0])
            print(team_pass_accuracy)
            # try:
            players_list = optimization_mid_algo(num_players_required, budget, specified_team, team_pass_accuracy)
            print(f"player lisr",players_list)
                    
        elif ( position == 'def'):
            Defenders_DB = pd.read_csv('Defenders_DB.csv')

            team_challenge_accuracy = float(Defenders_DB.loc[Defenders_DB['team_team'] == specified_team, 'challenge_tackles_pct_team'].values[0])
            team_aerials_accuracy = float(Defenders_DB.loc[Defenders_DB['team_team'] == specified_team, 'aerials_won_pct_team'].values[0])
            # try:
            players_list = optimization_def_algo(num_players_required, budget, specified_team, team_challenge_accuracy, team_aerials_accuracy)
            print(f"player lisr",players_list)    
        else:
            Goalkeepers_DB = pd.read_csv('Goalkeepers_DB.csv')

            team_savepct = float(Goalkeepers_DB.loc[Goalkeepers_DB['team_team'] == specified_team, 'gk_save_pct_team'].values[0])
            
            
            # try:
            players_list = optimization_gk_algo(num_players_required, budget, specified_team, team_savepct)
            print(f"player lisr",players_list)   

        


        

        players_json = players_list.to_json(orient='records')

        print(f"plaer fin",players_json)
        print("oming here")

            

        # Return a response (in this case, just echoing the received data)
        return jsonify({'output': f'{ players_json}'})

    except Exception as e:
        # Handle any errors that may occur during processing
        return jsonify({'error': str(e)}), 500

@app.route('/stats', methods=['POST'])

def run_scripts():
    try:
        # Getting data from the JSON request body
        data = request.get_json()

        

        # Accessing values from the received data
        specified_team = data.get('team')
        

        print(f"Team is {specified_team}", flush=True)

        

        

        

        

        print(f"Budget now is {specified_team}", flush=True)
        
       
        # try:
        stats_list = team_stats_chart(specified_team)
        print(f"player lisr",stats_list)
        print("oming here")

        
        


        

        #players_json = stats_list.to_json

        print(f"plaer fin",stats_list)
        print("oming here")

            

        # Return a response (in this case, just echoing the received data)
        return jsonify({'output': f'{ stats_list}'})

    except Exception as e:
        # Handle any errors that may occur during processing
        return jsonify({'error': str(e)}), 500

@app.route('/player', methods=['POST'])

def run_scriptss():
    try:
        # Getting data from the JSON request body
        data = request.get_json()

        

        # Accessing values from the received data
        player_name = data.get('playerName')
        player_position = data.get('position')
        

        print(f"Player Name is {player_name}", flush=True)

        

        

        

        

        
        
       
        # try:
        player_data = player_stats(player_name,player_position)
        print(f"player lisr",player_data)
        print("oming here")

        
        


        

        #players_json = stats_list.to_json

        print(f"plaer fin",player_data)
        print("oming here")

            

        # Return a response (in this case, just echoing the received data)
        return jsonify({'output': f'{ player_data}'})

    except Exception as e:
        # Handle any errors that may occur during processing
        return jsonify({'error': str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True)