import sys
import json
from manure_analyzer import MultiManureAnalyzer

def predict_manure():
    # Get input data from command line argument
    input_data = json.loads(sys.argv[1])
    
    # Initialize analyzer
    analyzer = MultiManureAnalyzer()
    
    # Get predictions
    results, _ = analyzer.analyze_soil(
        input_data['nitrogen'],
        input_data['phosphorous'],
        input_data['potassium'],
        input_data['ph'],
        input_data['calcium']
    )
    
    # Print results as JSON
    print(json.dumps(results))

if __name__ == "__main__":
    predict_manure()