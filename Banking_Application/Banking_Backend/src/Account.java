public class Account {
    private String first_name;
    private String last_name;
    private String user_name;
    private String password;
    private double balance;


    public String getFirst_name(){
        return this.first_name;
    }
    public String getLast_name(){
        return this.last_name;
    }
    public String getFull_name(){
        return (this.first_name + " " + this.last_name);
    }
    public String getUser_name(){
        return this.user_name;
    }
    public String getPassword(){
        return this.password;
    }
    public double getBalance(){
        return this.balance;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public void withdraw(double amount){
        if((this.balance - amount) < 0){
            System.out.println("You do not have that much money to withdraw!");
        }
        else{
            this.balance -= amount;
        }
    }
    public void deposit(double amount){
        this.balance += amount;
    }

}
