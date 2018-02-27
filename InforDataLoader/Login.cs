using Newtonsoft.Json;
using Saleslogix.SData.Client;
using Saleslogix.SData.Client.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace InforDataLoader
{
    public partial class Login : Form
    {
        private ViewModel vm;
        public Login()
        {
            InitializeComponent();
            this.vm = new ViewModel();
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            this.username.DataBindings.Add(new System.Windows.Forms.Binding("Text", vm, "Username", true));
            this.password.DataBindings.Add(new System.Windows.Forms.Binding("Text", vm, "Password", true));
            this.url.DataBindings.Add(new System.Windows.Forms.Binding("Text", vm, "Url", true));
        }

        private void loginBtn_Click(object sender, EventArgs e)
        {
            if(!String.IsNullOrWhiteSpace(username.Text) && !String.IsNullOrWhiteSpace(url.Text))
            {
                try
                {
                    var client = new SDataClient(url.Text + "/slx/dynamic/-/")
                    {
                        UserName = username.Text,
                        Password = password.Text
                    };
                    var contacts = client.Query("contacts").Take(1);
                    MainMenu main = new MainMenu()
                    {
                        Vm = this.vm
                    };
                    main.Show(this);
                    this.Hide();
                }catch(Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
                
            }else
            {
                MessageBox.Show("Username, and Sdata Url are required.");
            }
            
        }
    }
}
