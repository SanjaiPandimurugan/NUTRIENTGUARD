import sys
import json
from manure_analyzer import ManureAnalyzer

def predict_manure_requirements(sensor_data):
    try:
        analyzer = ManureAnalyzer()
        predictions = analyzer.predict(sensor_data)
        
        return {
            'cattle': {
                'amount': predictions['cattle_manure'],
                'confidence': 0.85
            },
            'poultry': {
                'amount': predictions['poultry_manure'],
                'confidence': 0.88
            },
            'organic': {
                'amount': predictions['organic_manure'],
                'confidence': 0.82
            }
        }
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    try:
        sensor_data = json.loads(sys.argv[1])
        predictions = predict_manure_requirements(sensor_data)
        print(json.dumps(predictions))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)