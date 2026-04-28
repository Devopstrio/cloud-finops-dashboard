import pandas as pd
import numpy as np

class FinOpsEngine:
    def __init__(self, data: pd.DataFrame):
        self.data = data # Expected columns: ['date', 'amount', 'service', 'team']

    def calculate_forecast(self, periods: int = 6):
        """
        Simple linear trend forecasting for budget projections.
        """
        self.data['date'] = pd.to_datetime(self.data['date'])
        monthly = self.data.resample('M', on='date')['amount'].sum().reset_index()
        
        x = np.arange(len(monthly))
        y = monthly['amount'].values
        
        z = np.polyfit(x, y, 1)
        p = np.poly1d(z)
        
        forecast_x = np.arange(len(monthly), len(monthly) + periods)
        forecast_y = p(forecast_x)
        
        return forecast_y.tolist()

    def identify_rightsizing(self, utilization_df: pd.DataFrame):
        """
        Identifies rightsizing opportunities based on average CPU utilization.
        """
        # Threshold: < 10% avg CPU over 30 days
        candidates = utilization_df[utilization_df['avg_cpu'] < 10]
        return candidates

if __name__ == "__main__":
    # Mock usage
    dates = pd.date_range(start='2026-01-01', periods=12, freq='M')
    amounts = [1000, 1100, 1050, 1200, 1250, 1300, 1400, 1350, 1500, 1550, 1600, 1650]
    df = pd.DataFrame({'date': dates, 'amount': amounts})
    
    engine = FinOpsEngine(df)
    forecast = engine.calculate_forecast()
    print(f"6-Month Spend Forecast: {forecast}")
