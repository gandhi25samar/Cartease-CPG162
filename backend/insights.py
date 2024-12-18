import pandas as pd
import matplotlib.pyplot as plt

# Path to the sales data CSV file
SALES_FILE = "sales_data.csv"

def generate_sales_insights():
    # Check if the sales data file exists
    try:
        sales_data = pd.read_csv(SALES_FILE)
    except FileNotFoundError:
        print("Error: Sales data file not found.")
        return

    # Group data by Order_ID
    order_group = sales_data.groupby("Order_ID")
    total_orders = order_group.ngroups

    # Calculate total sales
    total_sales = sales_data["Total_Sale"].sum()

    # Calculate the most and least selling products
    product_sales = sales_data.groupby("Item")["Quantity"].sum()
    most_selling_product = product_sales.idxmax()
    least_selling_product = product_sales.idxmin()

    # Calculate average order value
    average_order_value = total_sales / total_orders if total_orders > 0 else 0

    print("\nSales Insights:")
    print(f"Total Sales: ₹{total_sales:.2f}")
    print(f"Total Orders: {total_orders}")
    print(f"Most Selling Product: {most_selling_product}")
    print(f"Least Selling Product: {least_selling_product}")
    print(f"Average Order Value: ₹{average_order_value:.2f}")

    # Visualization
    create_sales_visualizations(sales_data, product_sales, order_group)


def create_sales_visualizations(sales_data, product_sales, order_group):
    # Total Sales per Product (Bar Chart)
    plt.figure(figsize=(10, 6))
    product_sales.plot(kind='bar', color='skyblue')
    plt.title('Total Sales per Product', fontsize=16)
    plt.xlabel('Product', fontsize=12)
    plt.ylabel('Quantity Sold', fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig('product_sales_bar_chart.png')
    plt.show()

    # Revenue Contribution by Product (Pie Chart)
    revenue_by_product = sales_data.groupby("Item")["Total_Sale"].sum()
    plt.figure(figsize=(8, 8))
    revenue_by_product.plot(kind='pie', autopct='%1.1f%%', startangle=140, colors=plt.cm.Paired.colors)
    plt.title('Revenue Contribution by Product', fontsize=16)
    plt.ylabel('')
    plt.tight_layout()
    plt.savefig('revenue_pie_chart.png')
    plt.show()

    # Average Order Value Distribution (Box Plot)
    order_totals = order_group["Total_Sale"].sum()
    plt.figure(figsize=(8, 6))
    plt.boxplot(order_totals, vert=False, patch_artist=True, boxprops=dict(facecolor="lightgreen"))
    plt.title('Order Total Distribution', fontsize=16)
    plt.xlabel('Order Total (₹)', fontsize=12)
    plt.tight_layout()
    plt.savefig('order_total_boxplot.png')
    plt.show()

if __name__ == "__main__":
    generate_sales_insights()