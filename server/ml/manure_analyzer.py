import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.preprocessing import StandardScaler

class MultiManureAnalyzer:
    def __init__(self):
        self.models = {
            'organic': XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42),
            'cattle': XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42),
            'poultry': XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
        }
        self.scalers = {
            'organic': StandardScaler(),
            'cattle': StandardScaler(),
            'poultry': StandardScaler()
        }
        
        self.manure_characteristics = {
            'organic': {'N': 1.5, 'P': 0.5, 'K': 1.0},
            'cattle': {'N': 0.5, 'P': 0.3, 'K': 0.5},
            'poultry': {'N': 3.0, 'P': 2.5, 'K': 1.5}
        }
        
        self._generate_training_data()
        self._train_models()
    
    def _generate_training_data(self):
        np.random.seed(42)
        n_samples = 1000
        
        self.training_data = {}
        for manure_type in self.models.keys():
            data = pd.DataFrame({
                'nitrogen': np.random.normal(40, 10, n_samples),
                'phosphorous': np.random.normal(25, 5, n_samples),
                'potassium': np.random.normal(30, 5, n_samples),
                'ph': np.random.normal(6.5, 0.5, n_samples),
                'calcium': np.random.normal(1000, 100, n_samples)
            })
            
            data['manure_needed'] = data.apply(
                lambda x: self._calculate_manure_need(x, manure_type), 
                axis=1
            )
            
            self.training_data[manure_type] = data
    
    def _calculate_manure_need(self, row, manure_type):
        characteristics = self.manure_characteristics[manure_type]
        
        base = 20
        
        n_adj = (40 - row['nitrogen']) / characteristics['N'] * 0.2
        p_adj = (25 - row['phosphorous']) / characteristics['P'] * 0.3
        k_adj = (30 - row['potassium']) / characteristics['K'] * 0.25
        ph_adj = abs(7.0 - row['ph']) * 2
        ca_adj = (1000 - row['calcium']) * 0.01
        
        if manure_type == 'organic':
            base *= 1.2
        elif manure_type == 'poultry':
            base *= 0.7
        
        return max(0, base + n_adj + p_adj + k_adj + ph_adj + ca_adj)
    
    def _train_models(self):
        training_metrics = {}
        for manure_type in self.models.keys():
            data = self.training_data[manure_type]
            X = data.drop('manure_needed', axis=1)
            y = data['manure_needed']
            
            X_train = self.scalers[manure_type].fit_transform(X)
            
            self.models[manure_type].fit(X_train, y)
            
            train_score = self.models[manure_type].score(X_train, y)
            
            training_metrics[manure_type] = {
                'train_score': train_score
            }
        
        return training_metrics
    
    def analyze_soil(self, nitrogen, phosphorous, potassium, ph, calcium):
        input_data = {
            'nitrogen': nitrogen,
            'phosphorous': phosphorous,
            'potassium': potassium,
            'ph': ph,
            'calcium': calcium
        }
        
        input_df = pd.DataFrame([input_data])
        results = {}
        
        for manure_type in self.models.keys():
            input_scaled = self.scalers[manure_type].transform(input_df)
            prediction = self.models[manure_type].predict(input_scaled)[0]
            
            importance = dict(zip(
                ['Nitrogen', 'Phosphorous', 'Potassium', 'pH', 'Calcium'],
                self.models[manure_type].feature_importances_
            ))
            
            results[manure_type] = {
                'prediction': prediction,
                'importance': importance
            }
        
        return results, input_data