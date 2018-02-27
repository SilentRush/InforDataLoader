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
    public partial class MainMenu : Form
    {
        private ViewModel vm;

        internal ViewModel Vm
        {
            get
            {
                return vm;
            }

            set
            {
                vm = value;
            }
        }

        public MainMenu()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void Insert_Click(object sender, EventArgs e)
        {
            InsertForm i = new InsertForm()
            {
                Vm = vm
            };
            i.Show(this);
            this.Hide();
        }

        private void Update_Click(object sender, EventArgs e)
        {
            ClickedBtnLabel.Text = "Update";
        }

        private void Upsert_Click(object sender, EventArgs e)
        {
            ClickedBtnLabel.Text = "Upsert";
        }

        private void Delete_Click(object sender, EventArgs e)
        {
            ClickedBtnLabel.Text = "Delete";
        }

        private void Export_Click(object sender, EventArgs e)
        {
            ClickedBtnLabel.Text = "Export";
        }
    }
}
